import Entity from "../entity";
import Enum from '../enum';

export namespace Note {
    export interface Update {
        id: number;
        note?: string;
        noteDate?: Date;
        task?: Entity.Task;
    }
    export interface ChildCreate {
        note: string;
        noteDate: Date;
    }
    export interface Insert extends ChildCreate {
        task: Entity.Task;
    }
}
export namespace Contract {
    export interface Update {
        id: number;
        referringAgent?: string;
        billerCode?: string;
        quoteLink?: string;
        invoiceLink?: string;
        cost?: number;
        estimate?: number;
    }
    export interface Insert {
        referringAgent: string;
        billerCode: string;
        quoteLink?: string;
        invoiceLink?: string;
        cost?: number;
        estimate: number;
    }
}
export namespace OTAssessment {
    export interface Update {
        id: number;
        referralReason?: string;
        billableCode?: string;
        assessmentDate?: Date;
    }
    export interface Insert {
        referralReason: string;
        billableCode: string;
        assessmentDate: Date;
    }
}
export namespace Task {
    export interface Update {
        id: number;
        project?: Entity.Project;
        user?: Entity.User;
        taskName?: string;
        due?: Date;
        taskType?: Enum.TaskType;
        estimatedTravel?: number;
        estimatedHours?: number;
        actualHours?: number;
        actualTravel?: number;
        report?: string;
        complete?: Date;
        contract?: Entity.Contract;
        assessment?: Entity.OTAssessment;
        notes?: Entity.Note[];
    }
    interface CreateRoot {
        taskName: string;
        due: Date;
        taskType: Enum.TaskType;
        estimatedTravel: number;
        estimatedHours: number;
        actualHours: number;
        actualTravel: number;
        report?: string;
        complete?: Date;
        contract?: (Entity.Contract | Contract.Insert);
        assessment?: (Entity.OTAssessment | OTAssessment.Insert);
        notes?: (Entity.Note | Note.ChildCreate)[];
    }
    export interface ProjectChildCreate extends CreateRoot {
        project: Entity.Project;
    }
    export interface UserChildCreate extends CreateRoot {
        user: Entity.User;
    }
    export interface Insert extends CreateRoot {
        project: Entity.Project;
        user: Entity.User;
    }
}