import {Material} from '../../../../types'
import {Pool} from 'promise-mysql'

export default async(pool: Pool, projectId: number, materialId: number, units: number) => {
    return pool.query('call project_assign_materials(?, ?, ?)', [projectId, materialId, units]);
}
