import {Resource} from '../../../types/access-control'

export default {
    [Resource.task]: {
        'read:own': ['*'],
        'update:own': ['*', '!id', '!assignment', '!taskName', '!due', '!taskType'],
    },
    [Resource.project]: {
        'read:own': ["*", '!assignments']
    },
    [Resource.user]: {
        'read:own': ['*', '!userHash'],
        'update:own': ['!id', '!hourlyRate', '!accessRights', '!assignments', '!skills']
    }
}