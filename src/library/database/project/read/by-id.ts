import {Pool} from 'promise-mysql'
import {Project} from '../../../../types'

export default async(pool: Pool, projectId: number) => pool.query('call read_project(?)', projectId).then(result => result[0][0] as Project);
