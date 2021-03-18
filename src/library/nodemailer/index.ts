import transport from './transport'
import Email from 'email-templates'
import templates from './templates'
import path from 'path'

const email = new Email({
    message: {
        from: process.env.NODE_FROM,
        attachments: [{
            filename: 'logo.jpg',
            path: path.join(__dirname, '../../assets/logo.jpg'),
            cid: 'logo'
        }],
    },
    transport,
    send: true,
    views: {
        root: path.join(__dirname, 'templates')
    },
    juice: true,
    juiceSettings: {
        tableElements: ['TABLE'],
    },
    juiceResources: {
        preserveImportant: true,
        webResources: {
            relativeTo: path.join(__dirname, '../../assets')
        }
    }
});

const newClient = (to: string, name: string) => templates.newClient(email, to, name);
const newClientNotification = (to: string, name: string, clientName: string, clientId: number) => templates.newClientNotification(email, to, name, clientName, clientId);

export default {newClient}
