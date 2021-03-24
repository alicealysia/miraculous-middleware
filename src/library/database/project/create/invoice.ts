import {Pool} from 'promise-mysql'

export default async (pool: Pool, projectId: number, invoiceId: string, amount: number) => {
    await pool.query('call project_update_invoiced(?, ?)', [projectId, amount]);
    return pool.query('call project_assign_invoice(?, ?)', [projectId, invoiceId]).then(results => results[0])
}; 
