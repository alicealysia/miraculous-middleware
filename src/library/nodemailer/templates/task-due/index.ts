import Email from 'email-templates'
import path from 'path'

export default (email: Email, to: string, username: string, taskName: string, dueMessage: 'due in one week' | 'due tomorrow' | 'due' | 'overdue', taskId: number) => email.send({
    template:'task-due',
    message: {
        to,
    },
    locals: {
        username,
        taskName,
        dueMessage,
        taskId
    }
})