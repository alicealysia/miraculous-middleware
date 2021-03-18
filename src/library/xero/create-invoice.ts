import getXero from './init'
import {Invoice} from 'xero-node'
import {User} from '../../types'

export default async(user: User, invoice: Invoice) => {
    if (!user.xeroToken  || !process.env.XERO_TENNANT_ID) {
        throw new Error('no xeroToken or unset tennant id');
    }
    const xero = await getXero();
    try {
        xero.setTokenSet(user.xeroToken);
    } catch {
        console.log('bad token');
    }
    return xero.accountingApi.createInvoices(process.env.XERO_TENNANT_ID, {invoices: [invoice]})
}