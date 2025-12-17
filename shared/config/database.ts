// shared/config/database.ts
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '../entities/users/User';
import { Test } from '../entities/tests/Test';
import { Question } from '../entities/questions/Question';
import { TestAttempt } from '../entities/tests/TestAttempt';
import { SubscriptionPlan } from '../entities/users/SubcriptionPlan';
import { UserPayment } from '../entities/users/UserPayment';
import { UserSubscriptionPlan } from '../entities/users/UserSubcriptions';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gmat_prep',
  synchronize: true,
  logging: process.env.DB_LOGGING === 'true',
  entities: [User, Test, Question, TestAttempt,SubscriptionPlan,UserPayment,UserSubscriptionPlan],
});

export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('✅ Database ready');
  }
};
