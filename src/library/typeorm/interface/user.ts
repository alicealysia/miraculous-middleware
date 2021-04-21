import {TokenSet} from 'openid-client'
import {Availability as AvailabilityClass, Leave as LeaveClass, Skill as SkillClass, User as UserClass} from '../entity/user';
import {Task as TaskClass} from '../entity/task'
import {Weekday} from '../enum/user'
import {Task} from './task'

export namespace User {
    export interface Insert{
        fullName: string;
        DOB: Date;
        address: string;
        phone: string;
        email: string;
        WWVPno?: number;
        WWVPexp?: Date;
        hourlyRate: number;
        accessRights: string[];
        userHash: string;
        xeroToken?: TokenSet;
        msalToken?: string;
        availability?: (AvailabilityClass | Availability.ChildCreate)[];
        leave?: (LeaveClass | Leave.ChildCreate)[];
        skills: (SkillClass | Skill.Insert)[];
        tasks: (TaskClass | Task.UserChildCreate)[];
    }
}
export namespace Availability {
    export interface ChildCreate {
        workDay: Weekday;
        startTime: number;
        endTime: number;
    }
    export interface Insert extends ChildCreate {
        user: UserClass;
    }
}
export namespace Leave {
    export interface ChildCreate {
        startDate: Date;
        endDate: Date;
    }
    export interface Insert extends ChildCreate {
        user: UserClass;
    }
}
export namespace Skill {
    export interface Insert {
        skill: string;
    }
}