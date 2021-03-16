import getXero from './init'

export default async (url: string) => getXero().then(_xero => _xero.apiCallback(url));