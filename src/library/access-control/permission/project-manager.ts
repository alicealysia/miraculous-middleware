import {Resource} from '../../../types'

export default  {
    $extend: ['occupationalTherapist', 'contractor'],
     [Resource.contract]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.otAssessment]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.task]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.user]: {
         'read:any': ['*', '!userHash'],
         'update:any': ['!id', '!accessRights']
     },
     [Resource.referral]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.material]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.assignMaterial]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.assignment]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.project]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     [Resource.closure]: {
         'read:any': ['*'],
         'create:any': ['*']
     },
     [Resource.client]: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     }
    }