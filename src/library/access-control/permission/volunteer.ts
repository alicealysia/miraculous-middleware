export default {
    task: {
        'read:own': ['*'],
        'update:own': ['*', '!id', '!assignment', '!taskName', '!due', '!taskType'],
    },
    note: {
        'read:own': ['*'],
        'create:own': ['*']
    },
    material: {
        'create:any': ['*']
    },
    assignMaterial: {
        'create:own': ['*'],
        'update:own': ['*']
    },
    project: {
        'read:own': ["*", '!assignments']
    },
    user: {
        'read:own': ['*', '!userHash'],
        'update:own': ['userHash']
    }
}