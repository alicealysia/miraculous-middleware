export default {
    $extend: ['volunteer'],
        contract: {
            'read:own': ['*'],
            'update:own': ['*'],
            'create:own': ['*']
        }
}