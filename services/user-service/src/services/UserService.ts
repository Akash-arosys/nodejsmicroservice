import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository.js';
import { cacheGetJSON, cacheSetJSON, cacheDelete } from '../../../../shared/config/redis.js';
import { publishEvent } from '../../../../shared/config/kafka.js';
import { generateToken } from '../../../../shared/utils/jwt.js';
import { User } from '../../../../shared/entities/User.js';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(
    email: string,
    name: string,
    password: string,
    phoneNumber?: string
  ): Promise<{ user: User; token: string }> {
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      phoneNumber,
      status: 'active',
      role: 'student',
    });

    // Generate JWT token
    const token = this.generateToken(user.id, user.email, user.name, user.role);

    // Publish event to Kafka
    try {
      await publishEvent('user-events', [
        {
          key: user.id,
          value: JSON.stringify({
            type: 'USER_REGISTERED',
            userId: user.id,
            email: user.email,
            name: user.name,
            timestamp: new Date(),
          }),
        },
      ]);
    } catch (e) {
      console.warn('Kafka publish failed (ignored):', (e as any)?.message || e);
    }


    // Cache user
    await cacheSetJSON(`user:${user.id}`, user, 3600);

    return { user, token };
  }

  async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Update last login
    await this.userRepository.updateLastLogin(user.id);

    // Generate token
    const token = this.generateToken(user.id, user.email, user.name, user.role);

    // Publish login event
    // await publishEvent('user-events', [
    //   {
    //     key: user.id,
    //     value: JSON.stringify({
    //       type: 'USER_LOGIN',
    //       userId: user.id,
    //       email: user.email,
    //       timestamp: new Date(),
    //     }),
    //   },
    // ]);

    return { user, token };
  }

  async getUserById(id: string): Promise<User | null> {
    // Try cache first
    const cached = await cacheGetJSON<User>(`user:${id}`);
    if (cached) {
      return cached;
    }

    const user = await this.userRepository.findById(id);
    if (user) {
      await cacheSetJSON(`user:${id}`, user, 3600);
    }

    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.update(id, data);
    if (user) {
      await cacheDelete(`user:${id}`);
    }
    return user;
  }

  async updateUserStats(userId: string, score: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update test count and average score
    await this.userRepository.incrementTestCount(userId);
    await this.userRepository.updateAverageScore(userId, score);

    // Clear cache
    await cacheDelete(`user:${userId}`);

    // Publish event
    await publishEvent('user-events', [
      {
        key: userId,
        value: JSON.stringify({
          type: 'USER_STATS_UPDATED',
          userId,
          score,
          timestamp: new Date(),
        }),
      },
    ]);
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.userRepository.update(userId, { password: hashedPassword });

    // Clear cache
    await cacheDelete(`user:${userId}`);
  }

  async getAllUsers(limit: number = 10, offset: number = 0) {
    return this.userRepository.findAll(limit, offset);
  }

  async getLeaderboard(limit: number = 100) {
    const leaderboard = await this.userRepository.getLeaderboard(limit);
    return leaderboard.map((user) => ({
      id: user.id,
      name: user.name,
      averageScore: user.averageScore,
      testsCompleted: user.testsCompleted,
      totalScore: user.totalScore,
    }));
  }

  async searchUsers(query: string, limit: number = 10, offset: number = 0) {
    return this.userRepository.search(query, limit, offset);
  }

  async getUserStats(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      testsCompleted: user.testsCompleted,
      averageScore: user.averageScore,
      totalScore: user.totalScore,
      lastLogin: user.lastLogin,
      role: user.role,
      status: user.status,
    };
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Delete user
    const deleted = await this.userRepository.delete(userId);
    if (deleted) {
      // Clear cache
      await cacheDelete(`user:${userId}`);

      // Publish event
      await publishEvent('user-events', [
        {
          key: userId,
          value: JSON.stringify({
            type: 'USER_DELETED',
            userId,
            timestamp: new Date(),
          }),
        },
      ]);
    }
  }

  // JWT utility
  private generateToken(userId: string, email: string, name: string, role: string): string {
    const secret = process.env.JWT_SECRET || 'eb97d3c5366dd35a6e3028b6546ef7f03b0aaf7c';
    const expiresIn = process.env.JWT_EXPIRY || '24h';

    return generateToken({
      id: userId,
      email: email,
      name: name,
      role: role,
    });
  }

  // Verify token
  static verifyToken(token: string): { userId: string; email: string; type: string } {
    const secret = process.env.JWT_SECRET || 'eb97d3c5366dd35a6e3028b6546ef7f03b0aaf7c';
    return jwt.verify(token, secret) as any;
  }
}