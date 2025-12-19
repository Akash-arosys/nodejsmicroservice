import { Router } from 'express';
import { QuestionController } from '../controllers/QuestionController';

const router = Router();
const controller = new QuestionController();

router.post('/', (req, res) => controller.createQuestion(req, res));
// router.get('/test/:testId', (req, res) => controller.getQuestionsByTest(req, res));
router.get('/:id', (req, res) => controller.getQuestion(req, res));
router.put('/:id', (req, res) => controller.updateQuestion(req, res));
router.delete('/:id', (req, res) => controller.deleteQuestion(req, res));

export default router;
