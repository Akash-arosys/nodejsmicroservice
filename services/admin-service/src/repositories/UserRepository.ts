import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../shared/config/database';
import { User } from '../../../../shared/entities/users/User';

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({
      where: { user_id:id },
      // relations: ['testAttempts'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
    });
  }

  async findByIdWithRelations(id: string): Promise<User | null> {
    return this.repo.findOne({
      where: { user_id:id },
      // relations: ['testAttempts'],
    });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async findAll(limit: number = 10, offset: number = 0): Promise<[User[], number]> {
    return this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { created_at: 'DESC' },
    });
  }

  async findByaccess_level(access_level: string,status:string, limit: number = 10, offset: number = 0): Promise<[User[], number]> {
    return this.repo.findAndCount({
      where: { access_level: access_level as any,user_status:status as any },
      take: limit,
      skip: offset,
      order: { created_at: 'DESC' },
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected || 0) > 0;
  }

  // async incrementTestCount(id: string): Promise<void> {
  //   const user = await this.findById(id);
  //   if (user) {
  //     user.testsCompleted += 1;
  //     await this.repo.save(user);
  //   }
  // }

  // async updateAverageScore(id: string, newScore: number): Promise<void> {
  //   const user = await this.findById(id);
  //   if (user) {
  //     const newAverage =
  //       (user.averageScore * (user.testsCompleted - 1) + newScore) / user.testsCompleted;
  //     user.averageScore = Math.round(newAverage * 100) / 100;
  //     user.totalScore += newScore;
  //     await this.repo.save(user);
  //   }
  // }

  async updateLastLogin(id: string): Promise<void> {
    await this.repo.update(id, { user_last_seen_on: new Date() });
  }

  async search(query: string, limit: number = 10, offset: number = 0): Promise<[User[], number]> {
    return this.repo
      .createQueryBuilder('user')
      .where('user.name LIKE :query', { query: `%${query}%` })
      .orWhere('user.email LIKE :query', { query: `%${query}%` })
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  // async getLeaderboard(limit: number = 100): Promise<User[]> {
  //   return this.repo.find({
  //     order: { averageScore: 'DESC' },
  //     take: limit,
  //   });
  // }

  async getTotalUsers(): Promise<number> {
    return this.repo.count();
  }

  async getActiveUsers(): Promise<number> {
    return this.repo.count({ where: { user_status: 'active' } });
  }

  async bulkUpdate(ids: string[], data: Partial<User>): Promise<void> {
    await this.repo.update(ids, data);
  }
}