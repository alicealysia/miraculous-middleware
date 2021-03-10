export default  {
    $extend: ['occupationalTherapist', 'contractor'],
     note: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     contract: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     otAssessment: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     task: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     user: {
         'read:any': ['*', '!userHash']
     },
     referral: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     material: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     assignMaterial: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     assignment: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     project: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     },
     closure: {
         'read:any': ['*'],
         'create:any': ['*']
     },
     client: {
         'create:any': ['*'],
         'read:any': ['*'],
         'update:any': ['*'],
         'delete:any': ['*']
     }
    }