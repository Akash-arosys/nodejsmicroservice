import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("question_options")
export class QuestionOption {
    @PrimaryGeneratedColumn({ type: "int" })
    question_option_id!: number;

    @Column("int", { nullable: true })
    question_id?: number;

    @ManyToOne(() => Question, (question) => question.question_id, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "question_id", referencedColumnName: "question_id" })
    question?: Question;

    @Column("varchar", { length: 500, nullable: true })
    question_option_content?: string;

    @Column("boolean", { default: false })
    is_question_option_correct!: boolean;

    @Column("boolean", { default: true })
    is_active!: boolean;

    @CreateDateColumn({ type: "datetime" })
    created_at!: Date;

    @Column("varchar", { length: 50, nullable: true })
    created_by?: string;

    @UpdateDateColumn({ type: "datetime" })
    updated_at!: Date;

    @Column("varchar", { length: 50, nullable: true })
    updated_by?: string;
}
