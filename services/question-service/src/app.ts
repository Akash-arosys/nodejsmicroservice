import express from 'express';
import { initializeDatabase } from '../../../shared/config/database.js';
// import { initializeRedis } from '../../shared/config/redis';
// import { createTopics } from '../../../shared/config/kafka';
import questionRoutes from './routes/questionRoutes.js';

const app = express();

app.use(express.json());
app.use('/', questionRoutes);

app.get('/health', (req, res) => {
  res.json({ service: 'question-service', status: 'ok' });
});

const PORT = process.env.QUESTION_SERVICE_PORT || 3003;

const startServer = async () => {
  try {
    await initializeDatabase();
    // await initializeRedis();
    // await createTopics([{ topic: 'question-events' }]);

    app.listen(PORT, () => {
      console.log(`🚀 Question Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start service:', error);
    process.exit(1);
  }
};

startServer();
