import {Pool} from 'promise-mysql'

export default async (pool: Pool, projectId: number) => pool.query('call project_read_quotes(?)', projectId).then(results => results[0]); 
