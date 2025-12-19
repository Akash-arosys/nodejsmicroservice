import { Router } from 'express';
import { TestController } from '../controllers/TestController';

const router = Router();
const controller = new TestController();

router.post('/', (req, res) => controller.createTest(req, res));
router.get('/', (req, res) => controller.getAllTests(req, res));
router.get('/:id', (req, res) => controller.getTest(req, res));
router.put('/:id', (req, res) => controller.updateTest(req, res));
router.delete('/:id', (req, res) => controller.deleteTest(req, res));
router.post('/:id/publish', (req, res) => controller.publishTest(req, res));

export default router;
