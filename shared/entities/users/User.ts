import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany
} from 'typeorm';
import { UserSubscriptionPlan } from "./UserSubcriptions";
import { UserPayment } from "./UserPayment";
import { UserPerformance, UserRole, UserStatusOptions } from "../../constant";

@Entity('user')
@Index('IDX_USER_EMAIL', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column('varchar', { length: 100, nullable: true })
  first_name?: string;

  @Column('varchar', { length: 100, nullable: true })
  last_name?: string;

  @Column('varchar', { length: 100 })
  email!: string;

  @Column('varchar', { length: 150 })
  password!: string;

  @Column('varchar', { length: 100, nullable: true })
  phone?: string;

 @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  access_level!: UserRole;

  @Column('int', { nullable: true  ,comment: 'user last score before joining us' })
  your_last_score_before_joining_us?: number;

  @Column('datetime', { nullable: true ,comment: 'user last seen on'})
  user_last_seen_on?: Date;

  @Column('datetime', { nullable: true , comment: 'user last test taken on app' })
  user_last_in_app_test_taken_on?: Date;

  @Column('decimal', { precision: 6, scale: 1, nullable: true ,comment: 'time in hours' })
  total_active_time_on_app_in_hours?: number;

  @Column('varchar', {
    length: 50,
    nullable: true, comment: 'id from chapter table'
  })
  bookmark_last_visited_topic_id?: number;

  @Column({
    type: "enum",
    enum: UserPerformance
  })
  performance_level?: UserPerformance;

  @Column('varchar', {
    length: 50,
    nullable: true, comment: 'id from user subcription table'
  })
  paid_subscription_id?: string;

  @Column('json', { nullable: true })
  user_session_object_json?: any;

  @Column('datetime', { nullable: true , comment: 'datetime when update user json'})
  user_session_object_jason_refresh_datetime?: Date;

  @Column({
    type: "enum",
    enum: UserStatusOptions,
    default: UserStatusOptions.ACTIVE,
  })
  user_status!: UserStatusOptions;
 
  @Column('int', { nullable:true})
  email_otp?: Number;

  @Column('boolean', { default:false})
  is_email_verified!: Boolean;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @Column('varchar', { length: 50, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  @Column('varchar', { length: 50, nullable: true })
  updated_by?: string;

  // Relations
  @OneToMany(() => UserSubscriptionPlan, (usp) => usp.user)
  subscriptions!: UserSubscriptionPlan[];

  @OneToMany(() => UserPayment, (payment) => payment.user)
  payments!: UserPayment[];
}
