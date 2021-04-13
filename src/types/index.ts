import * as ErrorHandling from './error-handling'
import * as AccessControl from './access-control'
import {Entity, Enum, Interface} from '../library/typeorm'

export {
    ErrorHandling,
    AccessControl,
    Entity,
    Enum, 
    Interface
}

const Resource = AccessControl.Resource;
export type IndexableEntity = {
    [Resource.client]: Entity.Client,
    [Resource.closure]: Entity.Closure,
    [Resource.contract]: Entity.Contract,
    [Resource.material]: Entity.Material,
    [Resource.otAssessment]: Entity.Note,
    [Resource.project]: Entity.Project,
    [Resource.referral]: Entity.Referral,
    [Resource.skill]: Entity.Skill,
    [Resource.task]: Entity.Task,
    [Resource.user]: Entity.User
}