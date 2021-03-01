export interface Material {
    id?: number,
    materialName: string,
    cost: number,
    serialCode: string,
    units?: number
}

export interface Assignment {
    id?: number,
    userId: number,
    userName?: string,
    accessRights?: string
}

export enum ProjectType {
    FreedomWheels = 0,
    Other = 1
}

export interface Project {
    id?: number,
    projectName: string,
    projectDescription: string,
    enquiryDate: string,
    startDate: Date,
    finishEstimate: Date,
    hoursEstimate: number,
    projectType: ProjectType,
    clientId: number,
    clientName?: string,
    assignments?: Assignment[],
    materials?: Material[]
}
