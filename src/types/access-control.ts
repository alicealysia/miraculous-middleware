export enum Resource {
    client = 'Client',
    closure = 'Closure',
    material = 'Material',
    project = 'Project',
    referral = 'Referral',
    skill = 'Skill',
    task = 'Task',
    contract = 'Contract',
    otAssessment = 'OTAssessment',
    user = 'User',
    billing = 'Billing'
}

export enum Read {
    one = 0,
    list = 1
}

export type readList = Resource.user | Resource.project | Resource.material | Resource.closure | Resource.referral | Resource.task | Resource.client | Resource.skill | Resource.billing;
export type cantReadList = Resource.contract | Resource.otAssessment ;
export type createAnyRequired = Resource.client | Resource.project | Resource.skill | Resource.material | Resource.user;
export type createOwnId = Resource.closure | Resource.contract  | Resource.otAssessment | Resource.project | Resource.referral | Resource.task | Resource.billing;

export enum Action {
    create = 'create',
    read = 'read',
    update = 'update',
    delete = 'delete'
}