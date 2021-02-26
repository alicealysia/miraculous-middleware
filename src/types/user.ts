export interface User {
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