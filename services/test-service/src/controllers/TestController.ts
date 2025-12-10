import { Request, Response } from 'express';
import { TestService } from '../services/TestService.js';

const testService = new TestService();

export class TestController {
  async createTest(req: Request, res: Response): Promise<void> {
    try {
      const test = await testService.createTest(req.body);
      res.status(201).json({ success: true, data: test });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async getTest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const test = await testService.getTestById(id);
      if (!test) {
        res.status(404).json({ success: false, error: 'Test not found' });
        return;
      }
      res.json({ success: true, data: test });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getAllTests(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const [tests, total] = await testService.getAllTests(limit, offset);
      res.json({ success: true, data: { tests, total, limit, offset } });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async updateTest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const test = await testService.updateTest(id, req.body);
      if (!test) {
        res.status(404).json({ success: false, error: 'Test not found' });
        return;
      }
      res.json({ success: true, data: test });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async deleteTest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await testService.deleteTest(id);
      res.json({ success: true, message: 'Test deleted' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async publishTest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const test = await testService.publishTest(id);
      res.json({ success: true, data: test });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
