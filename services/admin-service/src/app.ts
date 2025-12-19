import express from 'express';
import { initializeDatabase } from '../../../shared/config/database';
import { initializeRedis } from '../../../shared/config/redis';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json({ type: '*/*', limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.get('/health', (req, res) => {
  res.json({ service: 'admin-service', status: 'ok' });
});

const PORT = process.env.USER_SERVICE_PORT || 3001;

const startServer = async () => {
  // DB fail हो तो ही exit करें
  try {
    await initializeDatabase();
  } catch (err) {
    console.error('❌ DB init failed:', err);
    process.exit(1);
  }

  // Redis fail हो तो सिर्फ warning, exit नहीं
  // try {
  //   await initializeRedis();
  // } catch (err) {
  //   console.warn('⚠️ Redis init failed, ignoring:', (err as any)?.message || err);
  // }

  app.listen(PORT, () => {
    console.log(`🚀 User Service running on port ${PORT}`);
  });
};

startServer();
