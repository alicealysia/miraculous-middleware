import {Resource} from '../../../types/access-control'

export default {
    $extend: ['volunteer'],
        [Resource.contract]: {
            'read:own': ['*'],
            'update:own': ['*'],
            'create:own': ['*']
        }
}