// modules/users/controllers/SubscriptionPlanController.ts
import { Request, Response } from 'express';
import { SubscriptionPlanService } from '../services/SubscriptionPlanService';

const subscriptionPlanService = new SubscriptionPlanService();

export class SubscriptionPlanController {
  async createPlan(req: Request, res: Response): Promise<void> {
    try {
      const plan = await subscriptionPlanService.createPlan(req.body);
      res.status(201).json({
        success: true,
        data: plan,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create plan',
      });
    }
  }

  async getPlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const plan = await subscriptionPlanService.getPlanById(id);
      if (!plan) {
        res.status(404).json({
          success: false,
          error: 'Plan not found',
        });
        return;
      }
      res.json({
        success: true,
        data: plan,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch plan',
      });
    }
  }

  async getAllPlans(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const [plans, total] = await subscriptionPlanService.getAllPlans(limit, offset);
      res.json({
        success: true,
        data: {
          plans,
          total,
          limit,
          offset,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch plans',
      });
    }
  }

  async updatePlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const plan = await subscriptionPlanService.updatePlan(id, req.body);
      if (!plan) {
        res.status(404).json({
          success: false,
          error: 'Plan not found',
        });
        return;
      }
      res.json({
        success: true,
        data: plan,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update plan',
      });
    }
  }

  async deletePlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await subscriptionPlanService.deletePlan(id);
      res.json({
        success: true,
        message: 'Plan deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to delete plan',
      });
    }
  }
}
