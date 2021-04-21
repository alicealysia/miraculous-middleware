import {User} from '../../typeorm/entity/user'
import {readList, Resource, Action} from '../../../types/access-control'
import ac from '../permission'
import {getConnection, IndexableEntityObj} from '../../typeorm'
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
        return connection.getRepository(IndexableEntityObj[resource]).find().then(obj => obj.map((currentItem: any) => anyPerm.filter(currentItem)));
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