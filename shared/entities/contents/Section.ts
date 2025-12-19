import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Module } from "./Module";

@Entity("section")
export class Section {
    @PrimaryGeneratedColumn({ type: "int" })
    section_id!: number;

    @Column("varchar", {
        length: 200,
        nullable: true,
        comment: "Name of the section (e.g., Verbal, Quant, DI, 11th, 12th)",
    })
    section_name?: string;

    @Column("boolean", { default: true })
    is_active!: boolean;

    @OneToMany(() => Module, (module) => module.section)
    modules!: Module[];

    @CreateDateColumn({ type: "datetime" })
    created_at!: Date;

    @Column("varchar", { length: 50, nullable: true })
    created_by?: string;

    @UpdateDateColumn({ type: "datetime" })
    updated_at!: Date;

    @Column("varchar", { length: 50, nullable: true })
    updated_by?: string;
}
