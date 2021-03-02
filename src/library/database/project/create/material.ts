import {Material} from '../../../../types'
import {Pool} from 'promise-mysql'

export default async(pool: Pool, material: Material, projectId: number) => {
    return pool.query('call project_assign_materials(?, ?, ?)', [material.id, projectId, material.units]);
}
