import {Pool} from 'promise-mysql'
import {Project} from '../../../../types'

export default async(pool: Pool) => pool.query('call read_projects()').then(result => result[0] as Project[]);
