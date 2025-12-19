import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";

import { User } from "./User";
import { SubscriptionPlan } from "./SubcriptionPlan";
import { UserPayment } from "./UserPayment";
import { SubcriptionStatusOptions } from "../../constant";

@Entity('user_subscription_plan')
export class UserSubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  user_subscription_id!: string;

  @Column('varchar', { length: 100,nullable: true })
  user_id?: string;

  @Column('int', {nullable: true })
  plan_id?: Number;

  @Column('datetime')
  subscription_plan_purchase_date!: Date;

  @Column('datetime')
  subscription_plan_start_date!: Date;

  @Column('datetime')
  subscription_plan_end_date!: Date;

  @Column('varchar', { length: 50, nullable: true, comment: 'auto ended, refund' })
  subscription_end_reason?: string;

 @Column({
    type: "enum",
    enum: SubcriptionStatusOptions,
    default: SubcriptionStatusOptions.ACTIVE,
  })
  subcription_status!: SubcriptionStatusOptions;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user!: User;

  @ManyToOne(() => SubscriptionPlan, (plan) => plan.userSubscriptions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'plan_id', referencedColumnName: 'plan_id' })
  plan!: SubscriptionPlan;

  @OneToMany(() => UserPayment, (payment) => payment.userSubscription)
  payments!: UserPayment[];

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  @Column('varchar', { length: 50, nullable: true })
  updated_by?: string;
}
