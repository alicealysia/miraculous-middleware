import {getPool} from '../../pool'

export default async(contractId: number, quoteLink: string, cost: number) => getPool().then(pool => pool.query('call contract_update_quote(?, ?, ?)', [contractId, quoteLink, cost]));
