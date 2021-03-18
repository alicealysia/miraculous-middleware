import Email from 'email-templates'
import path from 'path'

export default (email: Email, to: string, username: string, clientName: string, clientId: number) => email.send({
    template:'new-client-notification',
    message: {
        to,
    },
    locals: {
        username,
        clientName,
        clientId
    }
})