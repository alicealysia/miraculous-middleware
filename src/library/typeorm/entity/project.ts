import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import { Client } from './client';
import {Task} from './task'

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

export class XeroLink {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    xeroLink!: string;
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
    @Column({length: 1000})
    projectDescription!: string;
    @Column()
    enquiryDate!: Date;
    @Column()
    startDate!: Date;
    @Column()
    finishEstimate!: Date;
    @Column()
    hoursEstimate!: number;
    @Column('enum')
    projectType!: ProjectType;
    @ManyToOne(() => Client, client => client.projects)
    client!: Client;
    @Column()
    amountInvoiced!: number;
    @Column()
    clientName?: string;
    @OneToMany(() => Task, task => task.project, {cascade: true})
    tasks!: Task[];
    @ManyToMany(() => Material , {cascade: true})
    @JoinTable()
    materials!: Material[];
    @ManyToMany(() => Material, {cascade: true} )
    @JoinTable()
    materialsEstimate!: Material[];
    @ManyToMany(() => XeroLink, {cascade: true})
    @JoinTable()
    quotes!: XeroLink[]
    @ManyToMany(() => XeroLink, {cascade: true})
    @JoinTable()
    invoices!: XeroLink[]
}