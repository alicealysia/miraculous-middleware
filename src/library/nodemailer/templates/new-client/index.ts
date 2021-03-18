import Email from 'email-templates'
import path from 'path'

export default (email: Email, to: string, name: string) => email.send({
    template:'new-client',
    message: {
        to
    },
    locals: {
        name
    }
})