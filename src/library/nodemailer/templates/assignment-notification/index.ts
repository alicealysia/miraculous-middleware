import Email from 'email-templates'
import path from 'path'

export default (email: Email, to: string, username: string) => email.send({
    template:'assignment-notification',
    message: {
        to,
    },
    locals: {
        username
    }
})