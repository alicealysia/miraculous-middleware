export default  {
    note: {
        'read:any': ['*']
    },
    contract: {
        'read:any': ['*']
    },
    otAssessment: {
        'read:any': ['*']
    },
    task: {
        'read:any': ['*', '!userHash']
    },
    user: {
        'read:any': ['*']
    },
    referral: {
        'read:any': ['*']
    },
    material: {
        'read:any': ['*']
    },
    assignMaterial: {
        'read:any': ['*']
    },
    assignment: {
        'read:any': ['*']
    },
    project: {
        'read:any': ['*']
    },
    closure: {
        'read:any': ['*']
    },
    billing: {
        'read:any': ['*'],
        'create:any': ['*']
    },
    client: {
        'read:any': ['*']
    }
}