import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Chapter } from "./Chapter";
import { AnswerOptionType, DifficultyLevel, QuestionType } from "../../constant";
import { QuestionOption } from "./QuestionOption";



@Entity("question")
export class Question {
  @PrimaryGeneratedColumn({ type: "int" })
  question_id!: number;

  @Column("int", { nullable: true })
  chapter_id?: number;

  @ManyToOne(() => Chapter, (ch) => ch.chapter_id, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "chapter_id", referencedColumnName: "chapter_id" })
  chapter?: Chapter;

  @Column("text", { nullable: true })
  question_text_part_1?: string;

  @Column("text", { nullable: true })
  question_text_part_2?: string;

  @Column("varchar", { length: 200, nullable: true })
  question_image_1?: string;

  @Column("varchar", { length: 200, nullable: true })
  question_image_2?: string;

  @Column("varchar", { length: 200, nullable: true })
  question_image_3?: string;

  @Column("varchar", { length: 200, nullable: true })
  question_image_4?: string;

  @Column({
    type: "enum",
    enum: AnswerOptionType,
    default: AnswerOptionType.TEXT,
  })
  answer_option_type!: AnswerOptionType;

  @Column({
    type: "enum",
    enum: DifficultyLevel,
  })
  difficulty_level?: DifficultyLevel;

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  average_time_in_seconds_consumed_overall?: number;

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  average_time_consumed_in_seconds_correct?: number;

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  average_time_in_consumed_seconds_incorrect?: number;

  @Column("int", { nullable: true })
  number_of_times_appeared_in_test?: number;

  @Column("int", { nullable: true })
  number_of_times_attempted?: number;

  @Column("int", { nullable: true })
  number_of_times_correctly_answered?: number;

  @Column("int", { nullable: true })
  number_of_times_incorrectly_answered?: number;

  @Column("varchar", { length: 500, nullable: true })
  doubt_video_link?: string;

  @Column("boolean", { nullable: true })
  can_include_in_custom_test?: boolean;

  @Column("int", { nullable: true })
  pyq_year?: number;

  @Column({
    type: "enum",
    enum: QuestionType,
  })
  question_type?: QuestionType;

  @Column("int", { nullable: true })
  number_of_options?: number;

  @Column("boolean", { default: true })
  is_active!: boolean;

  @OneToMany(() => QuestionOption, (quesop) => quesop.question)
  options!: QuestionOption[];

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @Column("varchar", { length: 50, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @Column("varchar", { length: 50, nullable: true })
  updated_by?: string;
}
