import {User} from '../../../types'

export default (user: User, projectId: number) => {
    if (!user.assignments) {
        return false;
    }
    return user.assignments.some(assignment => assignment.projectId === projectId);
}

//closure, assignMaterial, assignment