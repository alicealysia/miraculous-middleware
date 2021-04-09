import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm'
import { Project, User } from '.';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 1000})
    note!: string;
    @Column()
    noteDate!: Date;
    @ManyToOne(() => Task, task => task.notes, {cascade: true})
    task!: Task;
}

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    referringAgent!: string;
    @Column()
    billerCode!: string;
    @Column()
    quoteLink?: string;
    @Column()
    invoiceLink?: string;
    @Column()
    cost?: number;
    @Column()
    estimate!: number;
}

@Entity()
export class OTAssessment {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    referralReason!: string;
    @Column()
    billableCode!: string;
    @Column()
    assessmentDate!: Date;
}


export enum TaskType {
    simple= 0,
    contract = 1,
    assessment = 2
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Project, project => project.tasks, {cascade: true})
    project!: Project;
    @ManyToOne(() => User, user => user.tasks)
    user!: User;
    @Column()
    taskName!: string;
    @Column()
    due!: Date;
    @Column('enum')
    taskType!: TaskType;
    @Column()
    estimatedTravel!: number;
    @Column()
    estimatedHours!: number;
    @Column()
    actualHours: number = 0;
    @Column()
    actualTravel: number = 0;
    @Column()
    report?: string;
    @Column()
    complete?: Date;
    @OneToOne(() => Contract)
    @JoinColumn()
    contract?: Contract;
    @OneToOne(() => OTAssessment)
    @JoinColumn()
    assessment?: OTAssessment;
    @OneToMany(() => Note, note => note.task, {cascade: true})
    notes?: Note[];
}