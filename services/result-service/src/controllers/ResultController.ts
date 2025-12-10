import { Request, Response } from 'express';
import { ResultService } from '../services/ResultService.js';

const resultService = new ResultService();

export class ResultController {
  async getAttempt(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const attempt = await resultService.getAttemptById(id);
      if (!attempt) {
        res.status(404).json({ success: false, error: 'Attempt not found' });
        return;
      }
      res.json({ success: true, data: attempt });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getUserAttempts(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const [attempts, total] = await resultService.getUserAttempts(userId, limit, offset);
      res.json({ success: true, data: { attempts, total } });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getTestAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { testId } = req.params;
      const analytics = await resultService.getTestAnalytics(testId);
      res.json({ success: true, data: analytics });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
