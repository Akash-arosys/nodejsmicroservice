import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { UserSubscriptionPlan } from "./UserSubcriptions";
import { StatusOptions } from "../../constant";

@Entity('subscription_plan')
export class SubscriptionPlan {
    @PrimaryGeneratedColumn({ type: "int" })
    plan_id!: number;

    @Column('varchar', { length: 50 })
    plan_name!: string;

    @Column('json', {
        nullable: true,
        comment: 'it will store sections in json.'
    })
    accessible_sections_and_modules_json?: any;

    @Column('int', { comment: 'In Months' })
    plan_duration!: number;

    @Column('decimal', {
        precision: 8,
        scale: 2,
    })
    plan_price!: number;

    @Column('varchar', { length: 255, nullable: true })
    plan_description?: string;

    @Column({
        type: "enum",
        enum: StatusOptions,
        default: StatusOptions.ACTIVE,
    })
    plan_status!: StatusOptions;

    @OneToMany(() => UserSubscriptionPlan, (usp) => usp.plan_id)
    userSubscriptions!: UserSubscriptionPlan[];
}
