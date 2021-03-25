//costs hours worked, travel, material costs, contractor costs//
//hours worked = project -> assignments -> user.hourlyRate * task.hoursEstimate & task.actualHours 
//travel = project -> assignments -> task.estimatedTravel & task.actualTravel
//materials = project -> materialsUsed.units * materials.cost
//contractors = project -> assignments -> contract.cost

import {Material, Contract, ProjectType} from './index'

export interface UserCostings {
    fullName: string;
    accessRights: string;
    hourlyRate: number;
    actualHours: number;
    actualTravel: number;
}

export interface UserEstimates {
    fullName: string;
    accessRights: string;
    hourlyRate: number;
    hoursEstimate: number;
    estimatedTravel: number;
}

export interface InsertClosure {
    projectId: number;
    finalReport: string;
    totalHours: number;
    totalCost: number;
    totalQuote: number;
}

export interface Closure {
    id: number;
    projectName: string;
    projectDescription: string;
    enquiryDate: Date;
    startDate: Date;
    finishDate: Date;
    projectType: ProjectType;
    clientId: number;
    totalHours: number;
    finalReport: string;
    totalCost: number;
    totalQuote: number;
}

export interface Estimates {
    projectId: number;
    userEstimates: UserEstimates[];
    materialEstimates: Material[];
    contracts: Contract[];
    totalHours: number;
    totalLabor: number;
    totalMaterialCost: number;
    totalContractEstimate: number;
    totalCost: number;
}

export interface Costings {
    projectId: number;
    userCostings: UserCostings[];
    materials: Material[];
    contracts: Contract[];
    totalHours: number;
    totalLabor: number;
    totalMaterialCost: number;
    totalContractCost: number;
    totalCost: number;
}
