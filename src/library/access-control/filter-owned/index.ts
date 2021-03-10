import {User, Resource, Action, Client, Project, Closure, Assignment, Referral, Task} from '../../../types'
import ac from '../permission'
import {IQueryInfo} from 'accesscontrol'
import client from './client'
import {_projects, _closures, _assignment} from './project'
import referral from './referral'
import task from './task'

export default async (user: User, obj: any) => {
    const resource = determineResource(obj);
    const query: IQueryInfo = {action: Action.read, resource, role: user.accessRights};
    const anyPerm = ac.permission({...query, possession: 'any'});
    if (anyPerm.granted) {
        return anyPerm.filter(obj);
    }
    const ownPerm = ac.permission({...query, possession: 'own'});
    if (ownPerm.granted) {
        switch (resource) {
            case Resource.client: return await client(user, obj).then(clients => clients.map(_client => ownPerm.filter(_client)));
            case Resource.project: return _projects(user, obj).map(project => ownPerm.filter(project));
            case Resource.closure: return _closures(user, obj).map(closure => ownPerm.filter(closure));
            case Resource.assignment: return _assignment(user, obj).map(assignment => ownPerm.filter(assignment));
            case Resource.referral: return await referral(user, obj).then(_referrals => _referrals.map(_referral => ownPerm.filter(_referral)));
            case Resource.task: return task(user, obj).map(_task => ownPerm.filter(_task));
        }
    }
    throw new Error('unauthorized');
}

const isClient = (obj: any): obj is Client[] => true;
const isProject = (obj: any): obj is Project[] => true;
const isClosure = (obj: any): obj is Closure[] => true;
const isAssignment = (obj: any): obj is Assignment[] => true;
const isReferral = (obj: any): obj is Referral[] => true;
const isTask = (obj: any): obj is Task[] => true;

const determineResource = (obj: any) => {
    switch (obj) {
    case isClient(obj):
        return Resource.client;
    case isProject(obj):
        return Resource.project;
    case isClosure(obj):
        return Resource.closure;
    case isAssignment(obj):
        return Resource.assignment;
    case isReferral(obj):
        return Resource.referral;
    case isTask(obj):
        return Resource.task;
    default:
        return '';
    }
}