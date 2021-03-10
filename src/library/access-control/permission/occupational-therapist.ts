export default {
    $extend: ['volunteer'],
        otAssessment: {
            'read:own': ['*'],
            'update:own': ['*'],
            'create:own': ['*']
        },
        referral: {
            'read:any': ['*'],
            'update:any': ['*']
        },
        client: {
            'read:any': ['*']
        }
}