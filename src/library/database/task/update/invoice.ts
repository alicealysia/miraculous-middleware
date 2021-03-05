import {getPool} from '../../pool';
export default async(contractId: number, invoiceLink: string, cost: number) => getPool().then(pool => pool.query('call contract_update_complete(?, ?, ?)', [contractId, invoiceLink, cost]));
