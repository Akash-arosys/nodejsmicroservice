import { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';

const userService = new UserService();

export class UserController {
  // Register new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password, phoneNumber } = req.body;

      // Validation
      if (!email || !name || !password) {
        res.status(400).json({
          success: false,
          error: 'Email, name, and password are required',
        });
        return;
      }

      const result = await userService.registerUser(email, name, password, phoneNumber);

      res.status(201).json({
        success: true,
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Registration failed',
      });
    }
  }

  // Login user
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email and password are required',
        });
        return;
      }

      const result = await userService.loginUser(email, password);

      res.json({
        success: true,
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message || 'Login failed',
      });
    }
  }

  // Get user by ID
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch user',
      });
    }
  }

  // Update user
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update user',
      });
    }
  }

  // Get user stats
  async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const stats = await userService.getUserStats(id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch user stats',
      });
    }
  }

  // Get leaderboard
  async getLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const leaderboard = await userService.getLeaderboard(Math.min(limit, 1000));

      res.json({
        success: true,
        data: leaderboard,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch leaderboard',
      });
    }
  }

  // Search users
  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q) {
        res.status(400).json({
          success: false,
          error: 'Search query is required',
        });
        return;
      }

      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const [users, total] = await userService.searchUsers(q as string, limit, offset);

      res.json({
        success: true,
        data: {
          users,
          total,
          limit,
          offset,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Search failed',
      });
    }
  }

  // Change password
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: 'Old and new passwords are required',
        });
        return;
      }

      await userService.changePassword(id, oldPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to change password',
      });
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to delete user',
      });
    }
  }

  // Get all users (admin)
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const [users, total] = await userService.getAllUsers(limit, offset);

      res.json({
        success: true,
        data: {
          users,
          total,
          limit,
          offset,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch users',
      });
    }
  }
}