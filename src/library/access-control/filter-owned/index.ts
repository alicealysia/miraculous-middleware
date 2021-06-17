import {User} from '../../typeorm/entity/user'
import {readList, Resource, Action} from '../../../types/access-control'
import ac from '../permission'
import {Client, Closure, Contract, getConnection, IndexableEntityObj, Material, Project, Referral, Skill, Task} from '../../typeorm'
import {IQueryInfo} from 'accesscontrol'
import client from './client'
import {projects} from './project'
import referral from './referral'
import task from './task'


async function findOwned (user: User, resource: readList): Promise<any[]> {

    //build a queryInfo object
    const query: IQueryInfo = {action: Action.read, resource, role: user.accessRights};
    const anyPerm = ac.permission({...query, possession: 'any'});

    //if anyperm, return unfiltered.
    // also, rare any usage :O
    if (anyPerm.granted && resource !== Resource.billing) {
        const connection = await getConnection();
        switch (resource) {
            case Resource.client:
                return connection.getRepository(Client).find({relations: ['approvals', 'closures', 'projects', 'referrals', 'services']}).then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
            case Resource.closure:
                return connection.getRepository(Closure).find({relations: ['client']}).then(obj => obj.map(currentItem => {anyPerm.filter(currentItem)}));
            break;
            case Resource.material:
                return connection.getRepository(Material).find().then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
            case Resource.project:
                return connection.getRepository(Project).find({relations: ['client', 'invoices', 'materials', 'materialsEstimate']}).then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
            case Resource.referral:
                return connection.getTreeRepository(Referral).find({relations: ['OTReferrals', 'client', 'customDesigns', 'equipmentReferrals', 'services']}).then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
            case Resource.skill:
                return connection.getRepository(Skill).find().then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
            case Resource.task:
                return connection.getRepository(Task).find({relations:['assessment', 'contract', 'notes', 'project', 'user']}).then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
            case Resource.user:
                return connection.getRepository(User).find({relations:['availability', 'leave', 'skills', 'tasks']}).then(obj => obj.map(currentItem => anyPerm.filter(currentItem)));
            break;
        }
    }

    const ownPerm = ac.permission({...query, possession: 'own'});

    if (ownPerm.granted) {
        switch (resource) {
            case Resource.user: 
                const connection = await getConnection();
                const me = await connection.getRepository(User).findOneOrFail(user.id);
                return ownPerm.filter(me); 
            break;
            case Resource.client:
                return client(user.id, ownPerm.filter); 
            break;
            case Resource.project: 
                return projects(user.id, ownPerm.filter); 
            break;
            case Resource.referral: 
                return referral(user.id, ownPerm.filter); 
            break;
            case Resource.task: 
                return task(user.id, ownPerm.filter); 
            break;
            default:
                return [];
            break;
        }
    }
    throw new Error('unauthorized');
}

export default findOwned