import {User, Project, Closure, Assignment} from '../../../types'

export const _projects = (user: User, projects: Project[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    return projects.filter(project => assignments.some(assignment => assignment.projectId === project.id));
}

export const _closures = (user: User, closures: Closure[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const assignments = user.assignments;
    
    return closures.filter(closure => assignments.some(assignment => assignment.projectId === closure.projectId));
}

export const _assignment = (user: User, assignments: Assignment[]) => {
    if (!user.assignments) {
        throw new Error('no Assignments')
    }
    const userAssignments = user.assignments;
    
    return assignments.filter(assignment => userAssignments.some(userAssignment => userAssignment.id === assignment.id));
}