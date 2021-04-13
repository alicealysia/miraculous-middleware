import {TokenSet} from 'openid-client'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, ManyToMany} from 'typeorm'
import { Task } from './task';
import {Weekday} from '../enum/user'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    fullName!: string;
    @Column()
    DOB!: Date;
    @Column()
    address!: string;
    @Column()
    phone!: string;
    @Column()
    email!: string;
    @Column()
    WWVPno?: number;
    @Column()
    WWVPexp?: Date;
    @Column()
    hourlyRate!: number;
    @Column('array')
    accessRights!: string[];
    @Column()
    userHash!: string;
    @Column('json')
    xeroToken?: TokenSet;
    @Column()
    msalToken?: string;
    @OneToMany(() => Availability, availability => availability.user)
    availability?: Availability[];
    @OneToMany(() => Leave, leave => leave.user)
    leave?: Leave[];
    @ManyToMany(() => Skill)
    @JoinTable()
    skills!: Skill[];
    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
}

@Entity()
export class Availability {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column('simple-enum')
    workDay!: Weekday;
    @Column()
    startTime!: number;
    @Column()
    endTime!: number;
    @ManyToOne(() => User, user => user.availability)
    user!: User;
}

@Entity()
export class Leave {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    startDate!: Date;
    @Column()
    endDate!: Date;
    @ManyToOne(() => User, user => user.leave)
    user!: User;
}

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    skill!: string;
}
