const msal = require('@azure/msal-node');
//const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

import {Client} from '@microsoft/microsoft-graph-client'
import sites from './sites'

let client: Client;

const REDIRECT_URI = process.env.NODE_ENV === 'production'? 'http://localhost/msal' : `${process.env.BASE_URL}/msal`;

if (!process.env.MSAL_CLIENT_ID || !process.env.MSAL_CLIENT_SECRET) {
    throw new Error('unconfigured');
}
const config = {
    auth: {
        clientId: process.env.MSAL_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENNANT_ID}`,
        clientSecret: process.env.MSAL_CLIENT_SECRET
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
    scopes: ["Files.Read.All"],
    redirectUri: REDIRECT_URI,
};

const getCodeURL = async () => {
    return pca.getAuthCodeUrl(authCodeUrlParameters);
}

const getToken = async (code: string) => {
    const tokenRequest = {
        code,
        ...authCodeUrlParameters
    };
    return pca.acquireTokenByCode(tokenRequest);
}

export const getClient = (token: string) => {
    return Client.init({
        debugLogging: true,
        authProvider: (done) => done(null, token)
    });
}


export default {sites, getCodeURL, getClient, getToken}
