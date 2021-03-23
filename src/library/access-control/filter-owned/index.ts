import {User, Resource, Action, readList, resolveReadList} from '../../../types'
import ac from '../permission'
import {IQueryInfo} from 'accesscontrol'
import client from './client'
import {projects, closures, assignment} from './project'
import referral from './referral'
import task from './task'

//same typescript shinnanigans as accessControl.read.list
async function filterOwned <T extends readList>(user: User, resource: T, obj: resolveReadList[T]) {

    //build a queryInfo object
    const query: IQueryInfo = {action: Action.read, resource, role: user.accessRights};
    const anyPerm = ac.permission({...query, possession: 'any'});

    //if anyperm, return unfiltered.
    // also, rare any usage :O
    if (anyPerm.granted) {
        return obj.map((currentItem: any) => anyPerm.filter(currentItem));
    }

    const ownPerm = ac.permission({...query, possession: 'own'});

    if (ownPerm.granted) {
        switch (resource) {
            //figure out which resource the object array is, push it to the correct filter, return a filtered version of that array.
            //we use resolveReadList[resource.matchingCase] because typescript is too dumb to notice the branch & conditional we used to make our resource and type match.
            // the logic we use to filter stuff to owned is akin to the logic used in isOwn, but working backwards from an existing array.
            case Resource.user: 
                return ownPerm.filter((obj as resolveReadList[Resource.user]).find(thisUser => thisUser.id === user.id)); 
            break;
            case Resource.client: 
                return await client(user, obj as resolveReadList[Resource.client]).then(clients => clients.map(_client => ownPerm.filter(_client))); 
            break;
            case Resource.project: 
                return projects(user, obj as resolveReadList[Resource.project]).map(project => ownPerm.filter(project)); 
            break;
            case Resource.closure: 
                return closures(user, obj as resolveReadList[Resource.closure]).map(closure => ownPerm.filter(closure)); 
            break;
            case Resource.assignment: 
                return assignment(user, obj as resolveReadList[Resource.assignment]).map(assignment => ownPerm.filter(assignment)); 
            break;
            case Resource.referral: 
                return await referral(user, obj as resolveReadList[Resource.referral]).then(_referrals => _referrals.map(_referral => ownPerm.filter(_referral))); 
            break;
            case Resource.task: 
                return task(user, obj as resolveReadList[Resource.task]).map(_task => ownPerm.filter(_task)); 
            break;
        }
    }
    throw new Error('unauthorized');
}

export default filterOwned