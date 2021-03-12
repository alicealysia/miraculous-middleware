const msal = require('@azure/msal-node');

const REDIRECT_URI = 'http://localhost:8080/sharepoint/redirect';

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error('unconfigured');
}
const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
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
    return pca.acquireTokenByCode(tokenRequest)
}
