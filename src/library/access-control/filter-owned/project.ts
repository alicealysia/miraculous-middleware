import {User, Project, Estimates, Costings, Assignment} from '../../../types'

export const projects = (user: User, projectArray: Project[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    return projectArray.filter(project => assignments.some(assignment => assignment.projectId === project.id));
}

export const billing = (user: User, billingArray: Array<Estimates | Costings>) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    
    return billingArray.filter(billing => assignments.some(assignment => assignment.projectId === billing.projectId));
}

export const assignment = (user: User, assignmentArray: Assignment[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const userAssignments = user.assignments;
    
    return assignmentArray.filter(assignment => userAssignments.some(userAssignment => userAssignment.id === assignment.id));
}