import client from './client'
import project from './project'
import referral from './referral'
import {create as createTask, existing as existingTask, existingContract} from './task'
import user from './user'
import {Resource, Action} from '../../../types'


// check ownership based off resource and action
export default async (userId: number, action: Action, resource: Resource, id: number) => {
    switch (resource) {

        // client create requires 'any' permissions. otherwise, check ownership 
        case ( Resource.client):
            if (action !==  Action.create) {
                return client(userId, id);
            }
        return false;
        break;  //despite being unreachable, not using breaks causes weirdness

        // same rules apply to projects!
        case ( Resource.project): case Resource.closure:
            if (action !== Action.create) {
                return project(userId, id);
            }
        return false;
        break;
        
        case Resource.billing:
            return project(userId, id);
        break;
        // when created, referrals reference client id. as such, use client logic.
        // other actions use unique logic
        case Resource.referral:
            if (action === Action.create) {
                return client(userId, id);
            }
            return referral(userId, id);
        break;

        // same rules for tasks!
        case Resource.task: 
            if (action === Action.create) {
                return createTask(userId, id);
            }
            return existingTask(userId, id);
        break;

        case Resource.otAssessment:
            return existingTask(userId, id);
        break;
        case Resource.contract:
            if (action === Action.create) {
                return existingTask(userId, id);
            }
            return existingContract(userId, id);
        break;

        // users have pretty simple ownership rules (is the user you???)
        case Resource.user:
            return user(userId, id);
        break;
        default:
            return false;
        break;
    }
    
}
