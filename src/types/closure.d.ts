//costs hours worked, travel, material costs, contractor costs//
//hours worked = project -> assignments -> user.hourlyRate * task.hoursEstimate & task.actualHours 
//travel = project -> assignments -> task.estimatedTravel & task.actualTravel
//materials = project -> materialsUsed.units * materials.cost
//contractors = project -> assignments -> contract.cost

import {Material} from './index'

export interface UserCosts {
    fullName: string;
    accessRights: string;
    hourlyRate: number;
    hoursEstimate: number;
    actualHours: number;
    estimatedTravel: number;
    actualTravel: number;
}

export interface Closure {
    projectId: number;
    userCosts: UserCosts[];
    materialEstimates: Material[];
    materials: Material[];
    contractorCosts: number[];
    reports: string[];
    totalHours: number;
    totalCost: number;
}

