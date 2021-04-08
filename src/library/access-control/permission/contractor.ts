import {Resource} from '../../../types'

export default {
    $extend: ['volunteer'],
        [Resource.contract]: {
            'read:own': ['*'],
            'update:own': ['*'],
            'create:own': ['*']
        }
}