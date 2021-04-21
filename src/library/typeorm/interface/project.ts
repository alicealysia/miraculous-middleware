import {Client} from './client'
import {Client as ClientClass} from '../entity/client'
import {XeroLink as XeroLinkClass, Material as MaterialClass} from '../entity/project'
import {Task as TaskClass} from '../entity/task'

import Enum from '../enum'
import {Task} from './task'

export namespace Material {
    export interface Insert {
        materialName: string;
        cost: number;
        serialCode?: string;
    }
}

export namespace XeroLink {
    export interface Insert {
        xeroLink: string;
    }
    export interface Update {
        id: number;
        xeroLink: string;
    }
}

export namespace Project {
    export interface Insert extends ChildCreate {
        client: ClientClass;
    }
    export interface ChildCreate {
        projectName: string;
        projectDescription: string;
        enquiryDate: Date;
        startDate: Date;
        finishEstimate: Date;
        hoursEstimate: number;
        projectType: Enum.ProjectType;
        amountInvoiced: number;
        tasks?: (TaskClass | Task.ProjectChildCreate)[];
        materials?: (MaterialClass | Material.Insert)[];
        materialsEstimate: (MaterialClass | Material.Insert)[];
        quotes?: (XeroLinkClass | XeroLink.Insert)[];
        invoices?: (XeroLinkClass | XeroLink.Insert )[];
    }
}