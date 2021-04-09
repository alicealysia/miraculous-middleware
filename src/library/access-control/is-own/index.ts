import client from './client'
import project from './project'
import referral from './referral'
import {create as createTask, existing as existingTask, existingContract} from './task'
import user from './user'
import {Entity, AccessControl} from '../../../types'


// check ownership based off resource and action
export default async (userId: number, action: AccessControl.Action, resource: AccessControl.Resource, id: number) => {
    switch (resource) {

        // client create requires 'any' permissions. otherwise, check ownership 
        case (AccessControl.Resource.client):
            if (action !== AccessControl.Action.create) {
                return client(userId, id);
            }
        return false;
        break;  //despite being unreachable, not using breaks causes weirdness

        // same rules apply to projects!
        case (AccessControl.Resource.project): case AccessControl.Resource.closure:
            if (action !== AccessControl.Action.create) {
                return project(userId, id);
            }
        return false;
        break;

        // when created, referrals reference client id. as such, use client logic.
        // other actions use unique logic
        case AccessControl.Resource.referral:
            if (action === AccessControl.Action.create) {
                return client(userId, id);
            }
            return referral(userId, id);
        break;

        // same rules for tasks!
        case AccessControl.Resource.task: 
            if (action === AccessControl.Action.create) {
                return createTask(userId, id);
            }
            return existingTask(userId, id);
        break;

        case AccessControl.Resource.otAssessment:
            return existingTask(userId, id);
        break;
        case AccessControl.Resource.contract:
            if (action === AccessControl.Action.create) {
                return existingTask(userId, id);
            }
            return existingContract(userId, id);
        break;

        // users have pretty simple ownership rules (is the user you???)
        case AccessControl.Resource.user:
            return user(userId, id);
        break;
        default:
            return false;
        break;
    }
    
}
