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
    assignment = 'Assignment',
    user = 'User'
}

export enum Read {
    one = 0,
    list = 1
}

export type readList = Resource.user | Resource.project | Resource.assignment | Resource.material | Resource.closure | Resource.referral | Resource.task | Resource.client | Resource.skill;
export type cantReadList = Resource.contract | Resource.otAssessment ;
export type createAnyRequired = Resource.client | Resource.project | Resource.skill | Resource.material | Resource.user;
export type createOwnId = Resource.assignment | Resource.closure | Resource.contract  | Resource.otAssessment | Resource.project | Resource.referral | Resource.task ;

export enum Action {
    create = 'create',
    read = 'read',
    update = 'update',
    delete = 'delete'
}