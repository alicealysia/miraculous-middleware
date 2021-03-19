import {Request, Response, NextFunction} from 'express'
import {InsertClient} from '../../types'
import findProjectManagers from '../../utils/find-project-managers'
import {database, nodemailer} from '../../library' 

const emailProjectManagers = async (clientName: string, clientId: number) => {
    const projectManagers = await findProjectManagers();
    return Promise.all(projectManagers.map(projectManager => {
        nodemailer.newClientNotification(projectManager.email, projectManager.fullName, clientName, clientId);
    }));
}

export default async (request: Request, response: Response, next: NextFunction) => {
    const client: InsertClient = request.body;
    if (!client) {
        throw new Error('no client');
    }
    const clientId = await database.client.read.similar(client).catch(err => {return undefined});
    if (clientId) {
        await database.client.update({...client, id: clientId}).catch(err => next(err));
        await nodemailer.newClient(client.email, client.fullName);
        await emailProjectManagers(client.fullName, clientId);
        return response.send('success');
    }
    await database.client.create(client).catch(err => next(err));
    const ActualClientId = await nodemailer.newClient(client.email, client.fullName);
    await emailProjectManagers(client.fullName, ActualClientId);
    return response.send('success');
}
