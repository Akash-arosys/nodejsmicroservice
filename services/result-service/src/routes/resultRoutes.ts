import { Router } from 'express';
import { ResultController } from '../controllers/ResultController.js';

const router = Router();
const controller = new ResultController();

router.get('/:id', (req, res) => controller.getAttempt(req, res));
router.get('/user/:userId', (req, res) => controller.getUserAttempts(req, res));
router.get('/analytics/:testId', (req, res) => controller.getTestAnalytics(req, res));

export default router;
