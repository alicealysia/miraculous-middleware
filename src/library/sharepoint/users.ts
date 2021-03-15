import nodeFetch from 'node-fetch'

export default async (token: string) => nodeFetch('https://graph.microsoft.com/v1.0/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
});
