import client from './client'
import project from './project'
import {create as createReferral, existing as existingReferral, list as existingList} from './referral'
import {create as createTask, existing as existingTask} from './task'
import user from './user'
import {User, Resource, Action} from '../../../types'

export default async (_user: User, action: Action, resource: Resource, id: number, list?: boolean) => {
    switch (resource) {
        case (Resource.client):
            if (action !== Action.create) {
                return client(_user, id);
            }
        return false;
        case (Resource.project):
            if (action !== Action.create) {
                return project(_user, id);
            }
        return false;
        case Resource.closure: case Resource.assignMaterial: case Resource.assignment:
            return project(_user, id);
        case Resource.referral:
            if (action === Action.create) {
                return createReferral(_user, id);
            }
            if (list) {
                return existingList(_user, id);
            }
            return existingReferral(_user, id);
        case Resource.task: 
            if (action === Action.create) {
                return createTask(_user, id);
            }
            if (list) {
                return createTask(_user, id);
            }
            return existingTask(_user, id);
        case Resource.user:
            return user(_user, id);
        default:
            return false;
    }
    
}
