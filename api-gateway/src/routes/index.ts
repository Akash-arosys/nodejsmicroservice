import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

// Users
router.use(
  '/admin',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  })
);

// Tests
router.use(
  '/tests',
  createProxyMiddleware({
    target: process.env.TEST_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/tests': '' },
  }),
);

// Questions
router.use(
  '/questions',
  createProxyMiddleware({
    target: process.env.QUESTION_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: { '^/api/questions': '' },
  }),
);

// Results
router.use(
  '/results',
  createProxyMiddleware({
    target: process.env.RESULT_SERVICE_URL || 'http://localhost:3004',
    changeOrigin: true,
    pathRewrite: { '^/api/results': '' },
  }),
);

export default router;
