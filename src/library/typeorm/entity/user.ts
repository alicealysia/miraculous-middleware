import {Assignment} from './project'
import {TokenSet} from 'openid-client'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, ManyToMany} from 'typeorm'

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
    @Column()
    accessRights!: string[];
    @Column()
    xeroToken?: TokenSet;
    @Column()
    msalToken?: string;
    @OneToMany(() => Availability, availability => availability.userId)
    availability?: Availability[];
    @OneToMany(() => Leave, leave => leave.userId)
    leave?: Leave[];
    @ManyToMany(() => Skill)
    @JoinTable()
    skills!: Skill[];
    @OneToMany(() => Assignment, assignment => assignment.userId)
    assignments?: Assignment[];
}

export enum Weekday {
    sunday = 0,
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6
}

@Entity()
export class Availability {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    workDay!: Weekday;
    @Column()
    startTime!: number;
    @Column()
    endTime!: number;
    @ManyToOne(() => User, user => user.availability)
    userId!: User;
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
    userId!: User;
}

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    skill!: string;
}
