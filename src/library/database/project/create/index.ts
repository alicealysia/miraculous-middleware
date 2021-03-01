import assignmentQuery from './assignment'
import details from './details'
import {getPool} from '../../pool'
import {Project, Assignment} from '../../../../types'

export const create = async(project: Project) => {
    const connection = await getPool();
    const projectId = await details(connection, project);
    if (project.assignments) {
        const assignments = project.assignments.map(assignment => assignmentQuery(connection, projectId, assignment));
        await Promise.all(assignments);
    }
    return projectId;
}

export const createAssignment = async(projectId:number, _assignment: Assignment) => {
    const connection = await getPool();
    return assignmentQuery(connection, projectId, _assignment);
}
