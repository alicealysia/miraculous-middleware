import assignmentQuery from './assignment'
import details from './details'
import materialQuery from './material'
import {getPool} from '../../pool'
import {Project, Assignment, Material} from '../../../../types'

export const create = async(project: Project) => {
    const connection = await getPool();
    const projectId = await details(connection, project);
    if (project.assignments) {
        const assignments = project.assignments.map(assignment => assignmentQuery(connection, projectId, assignment));
        await Promise.all(assignments);
    }
    return projectId;
}

export const assignment = async(projectId:number, _assignment: Assignment) => {
    const connection = await getPool();
    return assignmentQuery(connection, projectId, _assignment);
}

export const material = async(_material: Material) => {
    const connection = await getPool();
    return materialQuery(connection, _material);
}
