
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';


@Entity('users')
@Index('IDX_USER_EMAIL', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  email!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('varchar', { length: 255 })
  password!: string;

  @Column('varchar', { length: 20, nullable: true })
  phoneNumber?: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('varchar', { length: 20, default: 'active' })
  status!: 'active' | 'inactive' | 'suspended';

  @Column('varchar', { length: 20, default: 'student' })
  role!: 'student' | 'admin' | 'instructor';

  @Column('int', { default: 0 })
  testsCompleted!: number;

  @Column('float', { default: 0 })
  averageScore!: number;

  @Column('float', { default: 0 })
  totalScore!: number;

  @Column('varchar', { length: 255, nullable: true })
  profileImage?: string;

  @Column('timestamp', { nullable: true })
  lastLogin?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}
