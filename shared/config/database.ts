// shared/config/database.ts
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '../entities/users/User';
import { Test } from '../entities/tests/Test';
import { TestAttempt } from '../entities/tests/TestAttempt';
import { SubscriptionPlan } from '../entities/users/SubcriptionPlan';
import { UserPayment } from '../entities/users/UserPayment';
import { UserSubscriptionPlan } from '../entities/users/UserSubcriptions';
import { Section } from '../entities/contents/Section';
import { Module } from '../entities/contents/Module';
import { Chapter } from '../entities/contents/Chapter';
import { Question } from '../entities/contents/Question';
import { QuestionOption } from '../entities/contents/QuestionOption';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gmatwise_db',
  synchronize: true,
  logging: process.env.DB_LOGGING === 'true',
  entities: [User, Test,TestAttempt,SubscriptionPlan,UserPayment,UserSubscriptionPlan,Section,Module,Chapter,Question,QuestionOption],
});

export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('✅ Database ready');
  }
};
