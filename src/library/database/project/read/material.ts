import {Pool} from 'promise-mysql'
import {Material} from '../../../../types'

export default async(pool: Pool, projectId: number) => pool.query('call project_read_materials(?)', projectId).then(result => result[0] as Material[]);
