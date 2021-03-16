import getXero from './init'
import {User} from '../../types'

export default async(user: User, quoteId?: string) => {
    if (!user.xeroToken || !process.env.XERO_TENNANT_ID) {
        throw new Error('no xeroToken or UNSET TENNANT ID');
    }
    const xero = await getXero();
    try {
        xero.setTokenSet(user.xeroToken);
    } catch {
        console.log('bad token');
    }

    if (quoteId) {
        return xero.accountingApi.getQuote(process.env.XERO_TENNANT_ID, quoteId).then(quoteObject => {
            const quotes = quoteObject.body.quotes;
            if (quotes) {
                return quotes[0];
            }
            return 'no quotes found'
        });
    }
    return xero.accountingApi.getQuotes(process.env.XERO_TENNANT_ID).then(quotesObject => quotesObject.body.quotes?.map(quote => ({
        title: quote.title,
        summary: quote.summary,
        id: quote.quoteID,
        quoteNumber: quote.quoteNumber,
        contactName: quote.contact?.name,
        total: quote.total
    })));
}
