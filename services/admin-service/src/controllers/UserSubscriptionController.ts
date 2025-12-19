// modules/users/controllers/UserSubscriptionController.ts
import { Request, Response } from 'express';
import { UserSubscriptionService } from '../services/UserSubscriptionService';
import { subscribe } from 'diagnostics_channel';

const userSubscriptionService = new UserSubscriptionService();

export class UserSubscriptionController {
  async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const sub = await userSubscriptionService.addUserSubcriptions(req.body);
      res.status(201).json({
        success: true,
        data: sub,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create subscription',
      });
    }
  }

  async getSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const sub = await userSubscriptionService.getSubscriptionById(id);
      if (!sub) {
        res.status(404).json({
          success: false,
          error: 'Subscription not found',
        });
        return;
      }
      res.json({
        success: true,
        data: sub,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch subscription',
      });
    }
  }

   async getAllSubscriptions(req: Request, res: Response): Promise<void> {
      try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const user_id = req.query.user_id as string | undefined;
        const [subscriptions, total] = await userSubscriptionService.getAllSubscriptions(limit, offset,user_id);
  
        res.json({
          success: true,
          data: {
            subscriptions,
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

  async updateSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const sub = await userSubscriptionService.updateSubscription(id, req.body);
      if (!sub) {
        res.status(404).json({
          success: false,
          error: 'Subscription not found',
        });
        return;
      }
      res.json({
        success: true,
        data: sub,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update subscription',
      });
    }
  }

  async deleteSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userSubscriptionService.deleteSubscription(id);
      res.json({
        success: true,
        message: 'Subscription deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to delete subscription',
      });
    }
  }
}
