import {Task} from './task'

export interface Material {
    id: number,
    materialName: string,
    cost: number,
    serialCode?: string,
    units: number
}

export const isMaterial = (obj: any): obj is Material => true;

export interface InsertMaterial {
    materialName: string,
    cost: number,
    serialCode?: string
}

export const isInsertMaterial = (obj: any): obj is InsertMaterial => true;

export interface AssignMaterial {
    id: number,
    units: number
}

export const isAssignMaterial = (obj: any): obj is AssignMaterial => true;

export interface Assignment {
    id: number,
    userId: number,
    userName: string,
    accessRights?: string,
    hourlyRate: number,
    tasks: Task[]
}

export const isAssignment = (obj: any): obj is Assignment => true;

export interface InsertAssignment {
    userId: number
}

export const isInsertAssignment = (obj: any): obj is InsertAssignment => true;

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
    materials?: Material[]
}

export const isProject = (obj: any): obj is Project => true;

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
    materials?: AssignMaterial[]
}

export const isInsertProject = (obj: any): obj is InsertProject => true;
