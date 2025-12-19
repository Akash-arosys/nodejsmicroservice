import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Section } from "./Section";
import { Chapter } from "./Chapter";

@Entity("module")
export class Module {
    @PrimaryGeneratedColumn({ type: "int" })
    module_id!: number;

    @Column("int", { nullable: true })
    section_id?: number;

    @Column("varchar", {
        length: 500,
        nullable: true,
        comment: "Name of the module (e.g., Arithmetic, Physics, Reading Comprehension)",
    })
    module_name?: string;

    @Column("boolean", { default: true })
    is_active!: boolean;

    @ManyToOne(() => Section, (section) => section.section_id, {
        onDelete: "SET NULL",
    })
    @JoinColumn({ name: "section_id", referencedColumnName: "section_id" })
    section?: Section;

    @OneToMany(() => Chapter, (chapter) => chapter.module)
    chapters!: Chapter[];

    @CreateDateColumn({ type: "datetime" })
    created_at!: Date;

    @Column("varchar", { length: 50, nullable: true })
    created_by?: string;

    @UpdateDateColumn({ type: "datetime" })
    updated_at!: Date;

    @Column("varchar", { length: 50, nullable: true })
    updated_by?: string;
}
