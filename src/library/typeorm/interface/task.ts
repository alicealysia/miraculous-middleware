import {Task} from "../entity/task";
import {Project} from '../entity/project';
import {User} from '../entity/user';
import {Contract as ContractClass, OTAssessment as OTAssessmentClass, Note as NoteClass} from '../entity/task'
import Enum from '../enum';

export namespace Note {
    export interface Update {
        id: number;
        note?: string;
        noteDate?: Date;
        task?: Task;
    }
    export interface ChildCreate {
        note: string;
        noteDate: Date;
    }
    export interface Insert extends ChildCreate {
        task: Task;
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
        project?: Project;
        user?: User;
        taskName?: string;
        due?: Date;
        taskType?: Enum.TaskType;
        estimatedTravel?: number;
        estimatedHours?: number;
        actualHours?: number;
        actualTravel?: number;
        report?: string;
        complete?: Date;
        contract?: ContractClass;
        assessment?: OTAssessmentClass;
        notes?: NoteClass[];
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
        contract?: (ContractClass | Contract.Insert);
        assessment?: (OTAssessmentClass | OTAssessment.Insert);
        notes?: (NoteClass | Note.ChildCreate)[];
    }
    export interface ProjectChildCreate extends CreateRoot {
        project: Project;
    }
    export interface UserChildCreate extends CreateRoot {
        user: User;
    }
    export interface Insert extends CreateRoot {
        project: Project;
        user: User;
    }
}