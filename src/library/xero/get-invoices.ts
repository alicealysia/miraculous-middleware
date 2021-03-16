import getXero from './init'
import {User} from '../../types'
import { InvoiceReminder } from 'xero-node';

export default async(user: User, invoiceId?: string) => {
    if (!user.xeroToken || !process.env.XERO_TENNANT_ID) {
        throw new Error('no xeroToken or UNSET TENNANT ID');
    }
    const xero = await getXero();
    try {
        xero.setTokenSet(user.xeroToken);
    } catch {
        console.log('bad token');
    }
    if (invoiceId) {
        return xero.accountingApi.getInvoice(process.env.XERO_TENNANT_ID, invoiceId).then(invoicesObject => {
            const invoices = invoicesObject.body.invoices;
            if (invoices) {
                return invoices[0];
            }
            return 'no invoices found';
        });
    }
    return xero.accountingApi.getInvoices(process.env.XERO_TENNANT_ID).then(invoicesObject => invoicesObject.body.invoices?.map(invoice => ({
        id: invoice.invoiceID,
        type: invoice.type,
        contact: invoice.contact?.name,
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        total: invoice.total,
        url: invoice.url
    })));
}
