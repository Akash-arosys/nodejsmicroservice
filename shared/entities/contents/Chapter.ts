import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Module } from "./Module";
import { Question } from "./Question";

@Entity("chapter")
export class Chapter {
  @PrimaryGeneratedColumn({ type: "int" })
  chapter_id!: number;

  @Column("int", { nullable: true })
  module_id?: number;

  @Column("varchar", {
    length: 500,
    nullable: true,
    comment: "Name of the chapter",
  })
  chapter_name?: string;

  @Column("boolean", { default: true })
  is_active!: boolean;

  @ManyToOne(() => Module, (module) => module.module_id, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "module_id", referencedColumnName: "module_id" })
  module?: Module;

  @OneToMany(() => Question, (question) => question.chapter)
  questions!: Question[];

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @Column("varchar", { length: 50, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @Column("varchar", { length: 50, nullable: true })
  updated_by?: string;
}
