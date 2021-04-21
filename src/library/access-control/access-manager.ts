import {Action, Resource} from '../../types'
import {User} from '../typeorm/entity/user'
import ac from './permission'
import {IQueryInfo} from 'accesscontrol'
import isOwn from './is-own'

//constructs a QueryInfo based off arguments, if possession is own, return isOwn function
export default async (user: User, action: Action, resource: Resource, id?: number) => {
    const query: IQueryInfo = {action, resource, role: user.accessRights};
    const anyPerm = ac.permission({...query, possession: 'any'});
    if (anyPerm.granted) {
        return anyPerm;
    }
    if (!id) {
        throw Error('id required for ownership check');
    }
    const ownPerm = ac.permission({...query, possession: 'own'});
    if (!ownPerm.granted) {
        throw Error('user unauthorized');
    }
    const ownership = await isOwn(user.id, action, resource, id);
    if (!ownership) {
        throw Error('user does not own resource');
    }
    return ownPerm;
}
