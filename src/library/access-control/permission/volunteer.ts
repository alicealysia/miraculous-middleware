export default {
    task: {
        'read:own': ['*'],
        'update:own': ['*', '!id', '!assignment', '!taskName', '!due', '!taskType'],
    },
    note: {
        'read:own': ['*'],
        'create:own': ['*']
    },
    project: {
        'read:own': ["*", '!assignments']
    },
    user: {
        'read:own': ['*', '!userHash'],
        'update:own': ['!id', '!hourlyRate', '!accessRights', '!assignments', '!skills']
    }
}