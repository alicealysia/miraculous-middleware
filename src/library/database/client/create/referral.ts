import {Pool} from 'promise-mysql'

export default async (connection: Pool, clientId: number, referrals: string[]) => {
    const queries = referrals.map(referralLink => connection.query('call client_create_referral(?, ?)', [clientId, referralLink]));
    return Promise.all(queries);
}