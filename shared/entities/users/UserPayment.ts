import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { UserSubscriptionPlan } from "./UserSubcriptions";

@Entity('user_payment')
export class UserPayment {
  @PrimaryGeneratedColumn('uuid')
  user_payment_id!: string;

  @Column('varchar', { length: 100, nullable: true })
  user_id?: string;

  @Column('varchar', { length: 100, nullable: true })
  user_subscription_id?: string;

  @Column('decimal', { precision: 7, scale: 2, comment: 'negative = refund' })
  amount!: number;

  @Column('varchar', { length: 500, nullable: true })
  comment_1?: string;

  @Column('varchar', { length: 500, nullable: true })
  comment_2?: string;

  @Column('datetime', { nullable: true })
  payment_date?: Date;

  @Column('varchar', { length: 50, nullable: true, comment: 'upi, card, cash, razorpay, stripe' })
  payment_method?: string;

  @Column('varchar', { length: 100, nullable: true, comment: 'payment gateway transaction ID' })
  transaction_no?: string;

  @Column('varchar', { length: 30, nullable: true, comment: 'pending, success, failed, refunded' })
  payment_status?: string;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user!: User;

  @ManyToOne(
    () => UserSubscriptionPlan,
    (usp) => usp.payments,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({
    name: 'user_subscription_id',
    referencedColumnName: 'user_subscription_id',
  })
  userSubscription!: UserSubscriptionPlan;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @Column('varchar', { length: 50, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  @Column('varchar', { length: 50, nullable: true })
  updated_by?: string;
}
