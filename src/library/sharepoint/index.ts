const msal = require('@azure/msal-node');

import users from './users'

const REDIRECT_URI = 'http://localhost:8080/api/sharepoint/redirect';

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error('unconfigured');
}
const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: "https://login.microsoftonline.com/f3c40ad1-b1f1-4acb-ab41-775c59682001",
        clientSecret: process.env.CLIENT_SECRET
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: any, message: any, containsPii: any) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const pca = new msal.ConfidentialClientApplication(config);

const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
};

export const getCodeURL = async () => {
    return pca.getAuthCodeUrl(authCodeUrlParameters);
}

export const getToken = async (code: string) => {
    const tokenRequest = {
        code,
        scopes: ["user.read"],
        redirectUri: REDIRECT_URI
    };
    return pca.acquireTokenByCode(tokenRequest);
}

export {users}
