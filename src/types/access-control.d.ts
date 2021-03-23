import {User, Project, Assignment, Closure, Referral, Task, Client} from '.'

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
    user = 'user'
}

export type readList = Resource.user | Resource.project | Resource.assignment | Resource.closure | Resource.referral | Resource.task | Resource.client;
export type cantReadList = Resource.assignMaterial | Resource.contract | Resource.material | Resource.otAssessment | Resource.skill;
export type createAnyRequired = Resource.client | Resource.project | Resource.skill | Resource.material;
export type createOwnId = Resource.assignMaterial | Resource.assignment | Resource.closure | Resource.contract  | Resource.otAssessment | Resource.project | Resource.referral | Resource.task | Resource.user;

export type resolveReadList = {
    [Resource.user]: User[],
    [Resource.project]: Project[],
    [Resource.assignment]: Assignment[],
    [Resource.closure]: Closure[],
    [Resource.referral]: Referral[],
    [Resource.task]: Task[],
    [Resource.client]: Client[]
}

export enum Action {
    create = 'create',
    read = 'read',
    update = 'update',
    delete = 'delete'
}
