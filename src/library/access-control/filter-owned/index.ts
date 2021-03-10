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
            case Resource.client: return await client(user, obj).then(clients => clients.map(_client => ownPerm.filter(_client))); break;
            case Resource.project: return _projects(user, obj).map(project => ownPerm.filter(project)); break;
            case Resource.closure: return _closures(user, obj).map(closure => ownPerm.filter(closure)); break;
            case Resource.assignment: return _assignment(user, obj).map(assignment => ownPerm.filter(assignment)); break;
            case Resource.referral: return await referral(user, obj).then(_referrals => _referrals.map(_referral => ownPerm.filter(_referral))); break;
            case Resource.task: return task(user, obj).map(_task => ownPerm.filter(_task)); break;
        }
    }
    throw new Error('unauthorized');
}

const isClient = (obj: any): obj is Client[] => (obj as Client[])[0].fullName !== undefined;
const isProject = (obj: any): obj is Project[] => (obj as Project[])[0].projectName !== undefined;
const isClosure = (obj: any): obj is Closure[] => (obj as Closure[])[0].totalCost !== undefined;
const isAssignment = (obj: any): obj is Assignment[] => (obj as Assignment[])[0].tasks !== undefined;
const isReferral = (obj: any): obj is Referral[] => ((obj as Referral[])[0].clientId  !== undefined && (obj as Referral[])[0].id  !== undefined);
const isTask = (obj: any): obj is Task[] => (obj as Task[])[0].taskName !== undefined;

const determineResource = (obj: any) => {
        if(isClient(obj)){
            return Resource.client;
        }
        if(isProject(obj)) {
            return Resource.project;
        }   
        if (isClosure(obj)) {
            return Resource.closure;
        }
        if (isAssignment(obj)) {
            return Resource.assignment;
        }
        if (isReferral(obj)) {
            return Resource.referral;
        }
        if (isTask(obj)) {
            return Resource.task;
        }
    return 'unknown';
}