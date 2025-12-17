import express from 'express';
import { initializeDatabase } from '../../../shared/config/database';
// import { initializeRedis } from '../../../../shared/config/redis';
// import { createTopics } from '../../../../shared/config/kafka';
import { TestCompletionConsumer } from './consumers/TestCompletionConsumer';
import resultRoutes from './routes/resultRoutes';

const app = express();
app.use(express.json());
app.use('/', resultRoutes);

app.get('/health', (req, res) => {
  res.json({ service: 'result-service', status: 'ok' });
});

let consumer: TestCompletionConsumer;
const PORT = process.env.RESULT_SERVICE_PORT || 3004;

const startServer = async () => {
  try {
    await initializeDatabase();
    // await initializeRedis();
    // await createTopics([
    //   { topic: 'test-completed' },
    //   { topic: 'result-events' },
    // ]);

    consumer = new TestCompletionConsumer();
    await consumer.start();

    app.listen(PORT, () => {
      console.log(`🚀 Result Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start service:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  await consumer.stop();
  process.exit(0);
});

startServer();
