import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes/index';
import { requestLogger } from './middleware/requestLogger';

const app = express();
// app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use((req, res, next) => {
  console.log("Gateway Received:", req.method, req.url);
  next();
});

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Gateway on ${PORT}`));
