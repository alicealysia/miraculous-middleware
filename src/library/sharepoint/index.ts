const msal = require('@azure/msal-node');
//const MicrosoftGraph = require("@microsoft/microsoft-graph-client");

import {Client} from '@microsoft/microsoft-graph-client'
import sites from './sites'

let client: Client;

const REDIRECT_URI = 'http://localhost:8080/api/sharepoint/redirect';

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error('unconfigured');
}
const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENNANT_ID}`,
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
    scopes: ["User.Read", "Sites.FullControl.All"],
    redirectUri: REDIRECT_URI,
};

export const getCodeURL = async () => {
    return pca.getAuthCodeUrl(authCodeUrlParameters);
}

export const getToken = async (code: string) => {
    const tokenRequest = {
        code,
        scopes: ["User.Read", "Sites.FullControl.All", "Sites.Read.All", "Sites.ReadWrite.All", "Sites.Manage.All"],
        redirectUri: REDIRECT_URI
    };
    return pca.acquireTokenByCode(tokenRequest);
}

export const getClient = (token: string) => {
    if (client) {
        return client;
    }
    client = Client.init({
        debugLogging: true,
        authProvider: (done) => done(null, token)
    })
    return client;
}

export {sites}
