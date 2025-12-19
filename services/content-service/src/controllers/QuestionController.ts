import { Request, Response } from 'express';
import { QuestionService } from '../services/QuestionService';

const questionService = new QuestionService();

export class QuestionController {
  async createQuestion(req: Request, res: Response): Promise<void> {
    try {
      const question = await questionService.createQuestion(req.body);
      res.status(201).json({ success: true, data: question });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async getQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const question = await questionService.getQuestionById(id as any);
      if (!question) {
        res.status(404).json({ success: false, error: 'Question not found' });
        return;
      }
      res.json({ success: true, data: question });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // async getQuestionsByTest(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { testId } = req.params;
  //     const questions = await questionService.getQuestionsByTestId(testId);
  //     res.json({ success: true, data: questions });
  //   } catch (error: any) {
  //     res.status(500).json({ success: false, error: error.message });
  //   }
  // }

  async updateQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const question = await questionService.updateQuestion(id as any, req.body);
      if (!question) {
        res.status(404).json({ success: false, error: 'Question not found' });
        return;
      }
      res.json({ success: true, data: question });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async deleteQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await questionService.deleteQuestion(id);
      res.json({ success: true, message: 'Question deleted' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
