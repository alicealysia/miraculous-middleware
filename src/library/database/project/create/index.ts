import assignmentQuery from './assignment'
import materialQuery from './material'
import details from './details'
import {getPool} from '../../pool'
import {InsertProject, InsertAssignment, AssignMaterial} from '../../../../types'

export const create = async(project: InsertProject) => {
    const connection = await getPool();
    const projectId = await details(connection, project);
    if (project.assignments) {
        await Promise.all(project.assignments.map(assignment => assignmentQuery(connection, projectId, assignment)));
    }
    if (project.materials) {
        Promise.all(project.materials.map(material => materialQuery(connection, projectId, material)));
    }
    return projectId;
}

export const createAssignment = async(projectId:number, _assignment: InsertAssignment) => {
    const connection = await getPool();
    return assignmentQuery(connection, projectId, _assignment);
}

export const assignMaterial = async(projectId: number, material: AssignMaterial) => {
    const pool = await getPool();
    return materialQuery(pool, projectId, material);
}
