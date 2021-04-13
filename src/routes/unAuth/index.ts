import {Request, Response, NextFunction} from 'express'
import {Entity, Interface} from '../../types'
import findProjectManagers from '../../utils/find-project-managers'
import {nodemailer, typeorm} from '../../library' 
import {DeepPartial} from 'typeorm'

const emailProjectManagers = async (clientName: string, clientId: number) => {
    const projectManagers = await findProjectManagers();
    return Promise.all(projectManagers.map(projectManager => {
        nodemailer.newClientNotification(projectManager.email, projectManager.fullName, clientName, clientId);
    }));
}

export default async (request: Request<any, any, Interface.Client.Insert, any>, response: Response, next: NextFunction) => {
    const client = request.body;
    const clientQuery = new typeorm(Entity.Client);
    let dbClient = await clientQuery.findOne({
        relations: ['referrals'],
        where: [{
                fullName: client.fullName,
                DOB: client.DOB,
                address: client.address,
                phone: client.phone
            }, {
                fullName: client.fullName,
                DOB: client.DOB,
                address: client.address,
                gender: client.gender
            }, {
                fullName: client.fullName,
                DOB: client.DOB,
                phone: client.phone,
                gender: client.gender
            }
        ]
    })
    //const clientId = await database.client.read.similar(client).catch(err => {return undefined});
    if (dbClient && dbClient.id) {
        await clientQuery.update({id: dbClient.id, ...client});
        await nodemailer.newClient(client.email, client.fullName);
        await emailProjectManagers(client.fullName, dbClient.id);
        return response.send('success');
    }
    const clientId = await clientQuery.create(client).then(created => created.id);
    await nodemailer.newClient(client.email, client.fullName);
    if (clientId) {
        await emailProjectManagers(client.fullName, clientId);
    }
    return response.send('success');
}
