import assignmentQuery from './assignment'
import materialQuery from './material'
import details from './details'
import {getPool} from '../../pool'
import {Project, Assignment, Material} from '../../../../types'

export const create = async(project: Project) => {
    const connection = await getPool();
    const projectId = await details(connection, project);
    if (project.assignments) {
        const assignments = project.assignments.map(assignment => assignmentQuery(connection, projectId, assignment));
        await Promise.all(assignments);
    }
    if (project.materials) {
        const materials = project.materials.map(material => {
            if (material.id && material.units) {
            return materialQuery(connection, projectId, material.id, material.units);
            }
            return 'noId';
        });
        await Promise.all(materials);
    }
    return projectId;
}

export const createAssignment = async(projectId:number, _assignment: Assignment) => {
    const connection = await getPool();
    return assignmentQuery(connection, projectId, _assignment);
}

export const assignMaterial = async(projectId: number, materialId: number, materialUnits: number) => {
    const pool = await getPool();
    return materialQuery(pool, projectId, materialId, materialUnits);
}
