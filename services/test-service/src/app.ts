import express from 'express';
import { initializeDatabase } from '../../../shared/config/database';
// import { initializeRedis } from '../../../shared/config/redis';
import testRoutes from './routes/testRoutes';

const app = express();
app.use(express.json());
app.use('/', testRoutes);

app.get('/health', (req, res) => res.json({ service: 'test-service', status: 'ok' }));

const PORT = process.env.TEST_SERVICE_PORT || 3002;

const startServer = async () => {
  try {
    await initializeDatabase();
    // await initializeRedis();
    app.listen(PORT, () => console.log(`🚀 Test Service: ${PORT}`));
  } catch (error) {
    console.error('Start failed:', error);
    process.exit(1);
  }
};

startServer();
