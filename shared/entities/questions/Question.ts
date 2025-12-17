import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('questions')
@Index('IDX_QUESTION_TEST_ID', ['testId'])
@Index('IDX_QUESTION_DIFFICULTY', ['difficulty'])
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  testId!: string;

  @Column('text')
  text!: string;

  @Column({ type: 'text', nullable: true })
  explanation!: string;

  @Column()
  sequenceNumber!: number;

  @Column('text')
  options!: string; // JSON stringified array

  @Column()
  correctAnswer!: number; // 0-based index

  @Column({ length: 50, default: 'single' })
  questionType!: 'single' | 'multiple' | 'truefalse' | 'fillblank';

  @Column({ length: 50, default: 'medium' })
  difficulty!: 'easy' | 'medium' | 'hard';

  @Column({ length: 100, nullable: true })
  category!: string;

  @Column({ length: 100, nullable: true })
  subject!: string;

  @Column({ default: 1 })
  marks!: number;

  @Column({ default: 0 })
  negativeMarks!: number;

  @Column({ default: 0 })
  attemptCount!: number;

  @Column({ default: 0 })
  correctPercentage!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
