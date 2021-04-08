import {Resource} from '../../../types/access-control'

export default {
    [Resource.user]: {
        'create:any': ['*'],
        'read:any': ['*', '!userHash'],
        'update:any': ['*'],
        'delete:any': ['*']
    },
    [Resource.skill]: {
        'create:any': ['*'],
        'read:any': ['*']
    }
}