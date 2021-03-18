import {Pool} from 'promise-mysql'

export default async (pool: Pool, projectId: number, invoiceId: string) => pool.query('call project_assign_invoice(?, ?)', [projectId, invoiceId]).then(results => results[0]); 
