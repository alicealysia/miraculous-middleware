import {Resource} from '../../../types'

export default {
    $extend: ['volunteer'],
        [Resource.otAssessment]: {
            'read:own': ['*'],
            'update:own': ['*'],
            'create:own': ['*']
        },
        [Resource.referral]: {
            'read:any': ['*'],
            'update:any': ['*']
        },
        [Resource.client]: {
            'read:any': ['*']
        }
}