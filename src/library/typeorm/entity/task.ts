import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm'
import { Project} from './project';
import {User} from './user'
import {TaskType} from '../enum/task'
import Interface from '../interface'

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 1000})
    note!: string;
    @Column()
    noteDate!: Date;
    @ManyToOne(() => Task, task => task.notes)
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
    @Column({nullable: true})
    quoteLink?: string;
    @Column({nullable: true})
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

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Project, project => project.tasks)
    project!: Project;
    @ManyToOne(() => User, user => user.tasks)
    user!: User;
    @Column()
    taskName!: string;
    @Column()
    due!: Date;
    @Column()
    taskType!: TaskType;
    @Column()
    estimatedTravel!: number;
    @Column()
    estimatedHours!: number;
    @Column({nullable: true})
    actualHours: number = 0;
    @Column({nullable: true})
    actualTravel: number = 0;
    @Column({nullable: true})
    report?: string;
    @Column({nullable: true})
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