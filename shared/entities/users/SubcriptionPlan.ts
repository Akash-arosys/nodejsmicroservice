import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { UserSubscriptionPlan } from "./UserSubcriptions";

@Entity('subscription_plan')
export class SubscriptionPlan {
    @PrimaryGeneratedColumn('uuid')
    plan_id!: string;

    @Column('varchar', { length: 50})
    plan_name!: string;

    @Column('json', {
        nullable: true,
        comment: 'it will store sections in json.'
    })
    accessible_sections_and_modules_json?: any;

    @Column('int', {comment: 'In Months' })
    plan_duration!: number;

    @Column('decimal', {
        precision: 8,
        scale: 2,
    })
    plan_price!: number;

    @Column('varchar', { length: 255, nullable: true })
    plan_description?: string;

    @Column('varchar', { length: 20, default: 'active', comment: 'active,inactive,delete' })
    plan_status!: 'active' | 'inactive' | 'delete';

    @OneToMany(() => UserSubscriptionPlan, (usp) => usp.plan_id)
    userSubscriptions!: UserSubscriptionPlan[];
}
