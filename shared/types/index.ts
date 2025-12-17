// User Types
export interface IUser {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  access_level: 'student' | 'admin' | 'instructor';
  testsCompleted: number;
  averageScore: number;
  createdAt: Date;
}

// Test Types
export interface ITest {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  duration: number;
  status: 'active' | 'inactive' | 'archived';
  attemptCount: number;
  averageScore: number;
  isPublished: boolean;
}

// Question Types
export interface IQuestion {
  id: string;
  testId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
}

// TestAttempt Types
export interface ITestAttempt {
  id: string;
  userId: string;
  testId: string;
  score: number;
  percentage: number;
  isPassed: boolean;
  duration: number;
}

// API Responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  limit?: number;
  offset?: number;
}

// Kafka Events
export interface UserRegisteredEvent {
  type: 'USER_REGISTERED';
  userId: string;
  email: string;
  name: string;
  timestamp: Date;
}

export interface TestCompletedEvent {
  type: 'TEST_COMPLETED';
  userId: string;
  testId: string;
  score: number;
  totalQuestions: number;
  timestamp: Date;
}

// DTOs
export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateTestDto {
  title: string;
  description: string;
  totalQuestions: number;
  duration: number;
  category?: string;
}
