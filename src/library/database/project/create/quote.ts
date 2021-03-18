import {Pool} from 'promise-mysql'

export default async (pool: Pool, projectId: number, quoteId: string) => pool.query('call project_assign_quote(?, ?)', [projectId, quoteId]).then(results => results[0]); 
