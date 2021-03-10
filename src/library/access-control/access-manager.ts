import {User, Resource, Action} from '../../types'
import ac from './permission'
import {IQueryInfo} from 'accesscontrol'
import isOwn from './is-own'


export default async (user: User, action: Action, resource: Resource, id?: number, list?: boolean) => {
    const query: IQueryInfo = {action, resource, role: user.accessRights};
    const anyPerm = ac.permission({...query, possession: 'any'});
    if (anyPerm.granted) {
        return anyPerm;
    }
    if (!id) {
        return false;
    }
    const ownPerm = ac.permission({...query, possession: 'own'});
    if (!ownPerm.granted) {
        return false;
    }
    const ownership = await isOwn(user, action, resource, id, list);
    if (!ownership) {
        return false;
    }
    return ownPerm;
}