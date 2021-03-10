export default {
    user: {
        'create:any': ['*'],
        'read:any': ['*', '!userHash'],
        'update:any': ['*'],
        'delete:any': ['*']
    },
    skill: {
        'create:any': ['*'],
        'read:any': ['*']
    }
}