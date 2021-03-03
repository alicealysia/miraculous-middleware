import {getPool} from '../../pool'
import {Contract} from '../../../../types'

export default async(contract: Contract) => getPool().then(pool => pool.query('call contract_update_complete(?, ?, ?)', [contract.id, contract.invoiceLink, contract.cost]));
