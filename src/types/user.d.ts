import {Task} from './task'
import {TokenSet} from 'openid-client'

export interface UninitUser {
    id?: number;
    fullName: string;
    DOB: Date;
    address: string;
    phone: string;
    email: string;
    WWVPno?: number;
    WWVPexp?: Date;
    hourlyRate: number;
    accessRights: string;
    xeroToken?: string;
    msalToken?: string;
    availability?: Availability[];
    leave?: Leave[];
    skills?: Skill[];
    assignments?: UserAssignment[];
}

export interface User {
    id: number;
    fullName: string;
    DOB: Date;
    address: string;
    phone: string;
    email: string;
    WWVPno?: number;
    WWVPexp?: Date;
    hourlyRate: number;
    accessRights: string[];
    xeroToken?: TokenSet;
    msalToken?: string;
    availability?: Availability[];
    leave?: Leave[];
    skills?: Skill[];
    assignments?: UserAssignment[];
}

export interface InsertUser {
    fullName: string;
    DOB: Date;
    address: string;
    phone: string;
    email: string;
    WWVPno?: number;
    WWVPexp?: Date;
    hourlyRate: number;
    accessRights: string[];
    availability?: Availability[];
    leave?: Leave[];
    skills?: Skill[];
    assignments?: UserAssignment[];
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

export interface UserAssignment {
    id: number,
    projectId: number,
    projectName: string,
    tasks: Task[]
}

export interface Availability {
    workDay: Weekday;
    startTime: number;
    endTime: number;
}

export interface Leave {
    id?: number;
    startDate: Date;
    endDate: Date;
}

export interface Skill {
    id: number;
    skill: string;
}