import billingAdmin from './billing-admin'
import contractor from './contractor'
import globalAdmin from './global-admin'
import occupationalTherapist from './occupational-therapist'
import projectManager from './project-manager'
import userAdmin from './user-admin'
import volunteer from './volunteer'
import {AccessControl} from 'accesscontrol'

export default new AccessControl ({
    billingAdmin,
    contractor,
    globalAdmin,
    occupationalTherapist,
    projectManager,
    userAdmin,
    volunteer
});
