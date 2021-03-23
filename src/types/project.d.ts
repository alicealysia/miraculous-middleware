import {Task} from './task'

export interface Material {
    id: number,
    materialName: string,
    cost: number,
    serialCode?: string,
    units: number
}

export interface InsertMaterial {
    materialName: string,
    cost: number,
    serialCode?: string
}

export interface AssignMaterial {
    id: number,
    units: number
}


export interface Assignment {
    id: number,
    userId: number,
    userName: string,
    accessRights?: string,
    hourlyRate: number,
    tasks: Task[]
}


export interface InsertAssignment {
    userId: number
}


export enum ProjectType {
    FreedomWheels = 0,
    Other = 1
}

export interface Project {
    id: number,
    projectName: string,
    projectDescription: string,
    enquiryDate: Date,
    startDate: Date,
    finishEstimate: Date,
    hoursEstimate: number,
    projectType: ProjectType,
    clientId: number,
    clientName?: string,
    assignments?: Assignment[],
    materials?: Material[],
    materialsEstimate?: Material[],
    quotes?: string[],
    invoices?: string[]
}


export interface InsertProject {
    projectName: string,
    projectDescription: string,
    enquiryDate: Date,
    startDate: Date,
    finishEstimate: Date,
    hoursEstimate: number,
    projectType: ProjectType,
    clientId: number,
    assignments?: InsertAssignment[],
    materials?: AssignMaterial[],
    materialsEstimate?: AssignMaterial[],
    quotes?: string[],
    invoices?: string[]
}

