import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import {SubscriptionPlanController} from "../controllers/SubscriptionPlanController";
import {UserSubscriptionController} from "../controllers/UserSubscriptionController";
import {UserPaymentController} from "../controllers/UserPaymentController";
const router = Router();
const userController = new UserController();
const planController = new SubscriptionPlanController();
const userSubController = new UserSubscriptionController();
const paymentController = new UserPaymentController();

// ⭐ static routes first
router.post('/users/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));

//admin 
router.post('/addEmployee', (req, res) => userController.addEmployee(req, res));
router.get('/search', (req, res) => userController.searchUsers(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));

// ⭐ dynamic routes always at bottom
router.patch('/users/:id', (req, res) => userController.updateUser(req, res));
router.get('/users/:id', (req, res) => userController.getUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
router.post('/users/otp-verification', (req, res) => userController.otpVerification(req, res));
router.post('/users/change-password', (req, res) => userController.changePassword(req, res));
router.post('/users/check-email', (req, res) => userController.checkEmail(req, res));


// Plans
router.post("/plans", planController.createPlan);
router.get("/plans", planController.getAllPlans);
router.get("/plans/:id", planController.getPlan);
router.patch("/plans/:id", planController.updatePlan);
router.delete("/plans/:id", planController.deletePlan);

// User subscriptions
router.post("/user-subscriptions", userSubController.createSubscription);
router.get("/user-subscriptions", userSubController.getAllSubscriptions);
router.get("/user-subscriptions/:id", userSubController.getSubscription);
router.patch("/user-subscriptions/:id", userSubController.updateSubscription);
router.delete("/user-subscriptions/:id", userSubController.deleteSubscription);

// Payments
router.post("/payments", paymentController.createPayment);
router.get("/payments", paymentController.getAllPayments);
router.get("/payments/:id", paymentController.getPayment);
router.patch("/payments/:id", paymentController.updatePayment);
router.delete("/payments/:id", paymentController.deletePayment);


export default router;
