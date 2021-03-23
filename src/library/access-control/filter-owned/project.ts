import {User, Project, Closure, Assignment} from '../../../types'

export const projects = (user: User, projectArray: Project[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    return projectArray.filter(project => assignments.some(assignment => assignment.projectId === project.id));
}

export const closures = (user: User, closureArray: Closure[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    
    return closureArray.filter(closure => assignments.some(assignment => assignment.projectId === closure.projectId));
}

export const assignment = (user: User, assignmentArray: Assignment[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const userAssignments = user.assignments;
    
    return assignmentArray.filter(assignment => userAssignments.some(userAssignment => userAssignment.id === assignment.id));
}