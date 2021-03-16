import {XeroClient} from 'xero-node';

const REDIRECT_URI = process.env.NODE_ENV === 'production'? 'http://localhost/xero' : `${process.env.BASE_URL}/xero`;

let xero: XeroClient;

export default async() => {
    if (xero) {
        return xero;
    }
    if (!process.env.XERO_CLIENT_ID || !process.env.XERO_CLIENT_SECRET) {
        throw new Error('no xero client id');
    }
    xero = await new XeroClient({
        clientId: process.env.XERO_CLIENT_ID,
        clientSecret: process.env.XERO_CLIENT_SECRET,
        redirectUris: [REDIRECT_URI],
        scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
    }).initialize();
    return xero;
}