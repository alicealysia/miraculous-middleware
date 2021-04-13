import {TokenSet} from 'openid-client'
import Entity from '../entity';
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
        availability?: (Entity.Availability | Availability.ChildCreate)[];
        leave?: (Entity.Leave | Leave.ChildCreate)[];
        skills: (Entity.Skill | Skill.Insert)[];
        tasks: (Entity.Task | Task.UserChildCreate)[];
    }
}
export namespace Availability {
    export interface ChildCreate {
        workDay: Weekday;
        startTime: number;
        endTime: number;
    }
    export interface Insert extends ChildCreate {
        user: Entity.User;
    }
}
export namespace Leave {
    export interface ChildCreate {
        startDate: Date;
        endDate: Date;
    }
    export interface Insert extends ChildCreate {
        user: Entity.User;
    }
}
export namespace Skill {
    export interface Insert {
        skill: string;
    }
}