import {Client} from './client'
import Entity from '../entity'
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
        client: Entity.Client;
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
        tasks?: (Entity.Task | Task.ProjectChildCreate)[];
        materials?: (Entity.Material | Material.Insert)[];
        materialsEstimate: (Entity.Material | Material.Insert)[];
        quotes?: (Entity.XeroLink | XeroLink.Insert)[];
        invoices?: (Entity.XeroLink | XeroLink.Insert )[];
    }
}