import client from './client'
import project from './project'
import referral from './referral'
import {create as createTask, existing as existingTask, existingContract} from './task'
import user from './user'
import {User, Resource, Action} from '../../../types'


// check ownership based off resource and action
export default async (_user: User, action: Action, resource: Resource, id: number) => {
    switch (resource) {

        // client create requires 'any' permissions. otherwise, check ownership 
        case (Resource.client):
            if (action !== Action.create) {
                return client(_user, id);
            }
        return false;
        break;  //despite being unreachable, not using breaks causes weirdness

        // same rules apply to projects!
        case (Resource.project): case Resource.closure:
            if (action !== Action.create) {
                return project(_user, id);
            }
        return false;
        break;

        case (Resource.billing):
            return project(_user, id);
        break;

        // below resources use same logic as projects, barring create restrictions.
        case Resource.assignMaterial: case Resource.assignment:
            return project(_user, id);
        break;

        // when created, referrals reference client id. as such, use client logic.
        // other actions use unique logic
        case Resource.referral:
            if (action === Action.create) {
                return client(_user, id);
            }
            return referral(_user, id);
        break;

        // same rules for tasks!
        case Resource.task: 
            if (action === Action.create) {
                return createTask(_user, id);
            }
            return existingTask(_user, id);
        break;

        case Resource.otAssessment:
            return existingTask(_user, id);
        break;
        case Resource.contract:
            if (action === Action.create) {
                return existingTask(_user, id);
            }
            return existingContract(_user, id);
        break;

        // users have pretty simple ownership rules (is the user you???)
        case Resource.user:
            return user(_user, id);
        break;
        default:
            return false;
        break;
    }
    
}
