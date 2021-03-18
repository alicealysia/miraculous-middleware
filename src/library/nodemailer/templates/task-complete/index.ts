import Email from 'email-templates'
import path from 'path'

export default (email: Email, to: string, username: string, subjectName: string, taskName: string, projectId: number) => email.send({
    template:'task-complete',
    message: {
        to,
    },
    locals: {
        username,
        taskName,
        subjectName,
        projectId
    }
})