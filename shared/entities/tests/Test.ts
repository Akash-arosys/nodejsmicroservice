import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('tests')
@Index('IDX_TEST_STATUS', ['status'])
@Index('IDX_TEST_CREATED_AT', ['createdAt'])
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'text', nullable: true })
  instructions!: string;

  @Column()
  totalQuestions!: number;

  @Column()
  duration!: number;

  @Column({ default: 1 })
  difficulty!: number;

  @Column({ length: 50, default: 'active' })
  status!: 'active' | 'inactive' | 'archived';

  @Column({ default: 0 })
  attemptCount!: number;

  @Column({ default: 0 })
  averageScore!: number;

  @Column({ length: 255, nullable: true })
  category!: string;

  @Column({ length: 255, nullable: true })
  tags!: string;

  @Column({ default: 100 })
  totalMarks!: number;

  @Column({ default: 0 })
  passingMarks!: number;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
