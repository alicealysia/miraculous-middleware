import {Resource} from '../../../types/access-control'

export default  {
    [Resource.contract]: {
        'read:any': ['*']
    },
    [Resource.otAssessment]: {
        'read:any': ['*']
    },
    [Resource.task]: {
        'read:any': ['*', '!userHash']
    },
    [Resource.user]: {
        'read:any': ['*']
    },
    [Resource.referral]: {
        'read:any': ['*']
    },
    [Resource.material]: {
        'read:any': ['*']
    },
    [Resource.assignment]: {
        'read:any': ['*']
    },
    [Resource.project]: {
        'read:any': ['*']
    },
    [Resource.closure]: {
        'read:any': ['*']
    },
    [Resource.client]: {
        'read:any': ['*']
    }
}