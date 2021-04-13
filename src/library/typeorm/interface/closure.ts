import {Entity} from '../'

import Enum from '../enum'

export namespace Closure {
    export interface Insert extends ChildCreate {
        client: Entity.Client;
    }
    export interface ChildCreate {
        projectName: string;
        projectDescription: string;
        enquiryDate: Date;
        startDate: Date;
        finishDate: Date;
        projectType: Enum.ProjectType;
        totalHours: number;
        finalReport: string;
        totalCost: number;
        totalQuote: number;
    }
}