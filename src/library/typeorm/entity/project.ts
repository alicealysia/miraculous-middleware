import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import {Task} from './task'
import {User} from './user'

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    materialName!: string;
    @Column()
    cost!: number;
    @Column()
    serialCode?: string;
}

// export interface AssignMaterial {
//     id: number;
//     units: number;
// }

export class XeroLink {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    xeroLink!: string;
}


@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Project, project => project.assignments)
    projectId!: Project;
    @ManyToOne(() => User, user => user.assignments)
    userId!: User;
    @OneToMany(() => Task, task => task.assignment)
    tasks!: Task[];
}


export enum ProjectType {
    FreedomWheels = 0,
    Other = 1
}

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    projectName!: string;
    @Column()
    projectDescription!: string;
    @Column()
    enquiryDate!: Date;
    @Column()
    startDate!: Date;
    @Column()
    finishEstimate!: Date;
    @Column()
    hoursEstimate!: number;
    @Column()
    projectType!: ProjectType;
    @Column()
    clientId!: number;
    @Column()
    amountInvoiced!: number;
    @Column()
    clientName?: string;
    @OneToMany(() => Assignment, assignment => assignment.projectId)
    assignments!: Assignment[];
    @ManyToMany(() => Material )
    @JoinTable()
    materials!: Material[];
    @ManyToMany(() => Material )
    @JoinTable()
    materialsEstimate!: Material[];
    @ManyToMany(() => XeroLink)
    @JoinTable()
    quotes!: XeroLink[]
    @ManyToMany(() => XeroLink)
    @JoinTable()
    invoices!: XeroLink[]
}