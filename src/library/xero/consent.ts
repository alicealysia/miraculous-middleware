import getXero from './init'

let consentURL: string;

export default async () => {
    if (consentURL) {
        return consentURL;
    }
    return getXero().then(_xero => _xero.buildConsentUrl());
}
