import {Pool} from 'promise-mysql'
import {Assignment} from '../../../../types'

export default async(pool: Pool, projectId: number) => pool.query('call project_read_assignments(?)', projectId).then(results => results[0] as Assignment[]);
