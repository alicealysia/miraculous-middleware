import {User, Project, Assignment, Closure, Referral, Task, Client, Estimates, Costings, Material, AssignMaterial} from '.'
import { InsertClient } from './client';
import { InsertClosure } from './closure';
import { InsertAssignment, InsertMaterial, InsertProject } from './project';
import { Contract, InsertContract, InsertOTAssessment, InsertTask, OTAssessment, BeginTask, CompleteTask, InsertNote, Note } from './task';
import { InsertUser, Skill } from './user';

export enum Resource {
    client = 'client',
    closure = 'closure',
    material = 'material',
    assignMaterial = 'assignMaterial',
    project = 'project',
    referral = 'referral',
    skill = 'skill',
    task = 'task',
    contract = 'contract',
    otAssessment = 'otAssessment',
    assignment = 'assignment',
    user = 'user',
    billing = 'billing'
}

export enum Read {
    one = 0,
    list = 1
}

export interface ContinueTask {
    id: number,
    hours: number,
    travel: number,
    note: Note
}

export interface UpdateContract {
    cost: number;
    link: string;
}

export type readList = Resource.user | Resource.project | Resource.assignment | Resource.material | Resource.closure | Resource.referral | Resource.task | Resource.client | Resource.billing | Resource.skill;
export type cantReadList = Resource.assignMaterial | Resource.contract | Resource.otAssessment ;
export type createAnyRequired = Resource.client | Resource.project | Resource.skill | Resource.material | Resource.user;
export type createOwnId = Resource.assignMaterial | Resource.assignment | Resource.closure | Resource.contract  | Resource.otAssessment | Resource.project | Resource.referral | Resource.task | Resource.billing;

//typesafe helper.
//needs less repitition, and more refinement where the OR statements are concerned.

export type resolveResource = {
    [Action.create]: {
        [Resource.client]: InsertClient;
        [Resource.closure]: InsertClosure;
        [Resource.material]: InsertMaterial;
        [Resource.assignMaterial]: AssignMaterial;
        [Resource.project]: InsertProject;
        [Resource.referral]: Referral;
        [Resource.skill]: string;
        [Resource.task]: InsertTask;
        [Resource.contract]: InsertContract;
        [Resource.otAssessment]: InsertOTAssessment;
        [Resource.assignment]: InsertAssignment;
        [Resource.user]: InsertUser;
        [Resource.billing]: string;
    };
    [Action.read]: {
        [Resource.client]: Client;
        [Resource.closure]: Closure;
        [Resource.material]: Material;
        [Resource.assignMaterial]: AssignMaterial;
        [Resource.project]: Project;
        [Resource.referral]: Referral;
        [Resource.skill]: Skill;
        [Resource.task]: Task;
        [Resource.contract]: Contract;
        [Resource.otAssessment]: OTAssessment;
        [Resource.assignment]: Assignment;
        [Resource.user]: User;
        [Resource.billing]: Estimates | Costings;
    };
    [Action.update]: {
        [Resource.client]: Client;
        [Resource.closure]: Closure;
        [Resource.material]: Material;
        [Resource.assignMaterial]: AssignMaterial;
        [Resource.project]: Project;
        [Resource.referral]: Referral;
        [Resource.skill]: Skill;
        [Resource.task]: BeginTask | CompleteTask | ContinueTask;
        [Resource.contract]: UpdateContract;
        [Resource.otAssessment]: OTAssessment;
        [Resource.assignment]: Assignment;
        [Resource.user]: User;
        [Resource.billing]: string;
    };
    [Action.delete]: {
        [Resource.client]: Client;
        [Resource.closure]: Closure;
        [Resource.material]: Material;
        [Resource.assignMaterial]: AssignMaterial;
        [Resource.project]: Project;
        [Resource.referral]: Referral;
        [Resource.skill]: Skill;
        [Resource.task]: Task;
        [Resource.contract]: Contract;
        [Resource.otAssessment]: OTAssessment;
        [Resource.assignment]: Assignment;
        [Resource.user]: User;
        [Resource.billing]: Estimates | Costings;
    }
}

export type resolveReadList = {
    [Resource.user]: User[],
    [Resource.project]: Project[],
    [Resource.assignment]: Assignment[],
    [Resource.closure]: Closure[],
    [Resource.referral]: Referral[],
    [Resource.task]: Task[],
    [Resource.client]: Client[],
    [Resource.billing]: Array<Estimates | Costings>,
    [Resource.material]: Material[],
    [Resource.skill]: Skill[]
}

export enum Action {
    create = 'create',
    read = 'read',
    update = 'update',
    delete = 'delete'
}
