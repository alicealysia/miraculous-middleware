import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm'
import {Assignment} from './project'

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 1000})
    note!: string;
    @Column()
    noteDate!: Date;
    @ManyToOne(() => Task, task => task.notes, {cascade: true})
    taskId!: Task;
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
    @ManyToOne(() => Assignment, assignment => assignment.tasks, {cascade: true})
    assignment!: Assignment;
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
    @OneToMany(() => Note, note => note.taskId, {cascade: true})
    notes?: Note[];
}