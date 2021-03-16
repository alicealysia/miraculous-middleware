import getXero from './init'

export default async() => {
    const xero = await getXero();
    return xero.refreshToken();
}