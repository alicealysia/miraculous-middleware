import getXero from './init'
import {Quote} from 'xero-node'
import {User} from '../../types'

export default async(user: User, quote: Quote) => {
    if (!user.xeroToken  || !process.env.XERO_TENNANT_ID) {
        throw new Error('no xeroToken or unset tennant id');
    }
    const xero = await getXero();
    try {
        xero.setTokenSet(user.xeroToken);
    } catch {
        console.log('bad token');
    }
    return xero.accountingApi.createQuotes(process.env.XERO_TENNANT_ID, {quotes: [quote]})
}