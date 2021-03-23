import {User} from '../../../types'

// is a project assigned to a user?

export default (user: User, projectId: number) => {
    if (!user.assignments) {
        return false;
    }
    return user.assignments.some(assignment => assignment.projectId === projectId);
}

//also used by closure, assignMaterial, assignment