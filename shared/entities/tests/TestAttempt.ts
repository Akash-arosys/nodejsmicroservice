import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index
} from 'typeorm';

@Entity('test_attempts')
@Index('IDX_ATTEMPT_USER_ID', ['userId'])
@Index('IDX_ATTEMPT_TEST_ID', ['testId'])
@Index('IDX_ATTEMPT_COMPLETED_AT', ['completedAt'])
export class TestAttempt {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @Column('uuid')
  testId!: string;

  @Column('int', { default: 0 })
  score!: number;

  @Column('int', { default: 0 })
  totalQuestions!: number;

  @Column('int', { default: 0 })
  correctAnswers!: number;

  @Column('int', { default: 0 })
  wrongAnswers!: number;

  @Column('int', { default: 0 })
  unattempted!: number;

  @Column('int', { default: 0 })
  duration!: number; // seconds

  @Column('float', { default: 0 })
  percentage!: number;

  @Column({ type: 'text', nullable: true })
  answers!: string;

  @Column({ type: 'text', nullable: true })
  questionStatistics!: string;

  @Column({ type: 'text', nullable: true })
  subjectWiseScore!: string;

  @Column({ default: false })
  isPassed!: boolean;

  @Column({ length: 50, default: 'completed' })
  status!:
    | 'in-progress'
    | 'completed'
    | 'submitted'
    | 'reviewed';

  @Column({ type: 'text', nullable: true })
  review!: string;

  @Column({ type: 'text', nullable: true })
  deviceInfo!: string;

  @Column({ length: 100, nullable: true })
  ipAddress!: string;

  @Column({ default: true })
  isValid!: boolean;

  @CreateDateColumn()
  startedAt!: Date;

  @CreateDateColumn()
  completedAt!: Date;

}
