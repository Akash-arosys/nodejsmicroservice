import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = Router();
const controller = new UserController();

// ⭐ static routes first
router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/leaderboard', (req, res) => controller.getLeaderboard(req, res));
router.get('/search', (req, res) => controller.searchUsers(req, res));
router.get('', (req, res) => controller.getAllUsers(req, res));

// ⭐ dynamic routes always at bottom
router.get('/:id', (req, res) => controller.getUser(req, res));
router.put('/:id', (req, res) => controller.updateUser(req, res));
router.get('/:id/stats', (req, res) => controller.getUserStats(req, res));
router.post('/:id/change-password', (req, res) => controller.changePassword(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

export default router;
