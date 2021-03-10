import {Task} from './task'

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
    xeroId?: number;
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
    xeroId?: number;
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
    xeroId?: number;
    availability?: Availability[];
    leave?: Leave[];
    skills?: Skill[];
    assignments?: UserAssignment[];
}

export const isUser = (obj: any): obj is User => true;

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

export const isUserAssignment = (obj: any): obj is UserAssignment => true;

export interface Availability {
    workDay: Weekday;
    startTime: number;
    endTime: number;
}

export const isAvailability = (obj: any): obj is Availability => true;

export interface Leave {
    id?: number;
    startDate: Date;
    endDate: Date;
}

export const isLeave = (obj: any): obj is Leave => true;

export interface Skill {
    id: number;
    skill: string;
}

export const isSkill = (obj: any): obj is Skill => true;
