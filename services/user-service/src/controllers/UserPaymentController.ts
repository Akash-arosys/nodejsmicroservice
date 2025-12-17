// modules/users/controllers/UserPaymentController.ts
import { Request, Response } from 'express';
import { UserPaymentService } from '../services/UserPaymentService';

const userPaymentService = new UserPaymentService();

export class UserPaymentController {
  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const payment = await userPaymentService.createPayment(req.body);
      res.status(201).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create payment',
      });
    }
  }

 async getAllPayments(req: Request, res: Response): Promise<void> {
      try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const user_id = req.query.user_id as string | undefined;
        const user_subscription_id = req.query.user_subscription_id as string | undefined;
        const [payments, total] = await userPaymentService.getAllPayments(limit, offset,user_id,user_subscription_id);
  
        res.json({
          success: true,
          data: {
            payments,
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

  async getPayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await userPaymentService.getPaymentById(id);
      if (!payment) {
        res.status(404).json({
          success: false,
          error: 'Payment not found',
        });
        return;
      }
      res.json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch payment',
      });
    }
  }

  async updatePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await userPaymentService.updatePayment(id, req.body);
      if (!payment) {
        res.status(404).json({
          success: false,
          error: 'Payment not found',
        });
        return;
      }
      res.json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update payment',
      });
    }
  }

  async deletePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userPaymentService.deletePayment(id);
      res.json({
        success: true,
        message: 'Payment deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to delete payment',
      });
    }
  }
}
