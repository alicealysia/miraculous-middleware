import {AssignMaterial} from '../../../../types'
import {Pool} from 'promise-mysql'

export default async(pool: Pool, projectId: number, material: AssignMaterial) => {
    return pool.query('call project_assign_materials(?, ?, ?)', [projectId, material.id, material.units]);
}
