import {Request, Response, NextFunction} from 'express'
import { Interface } from '../../library/typeorm/'
import { Client } from '../../library/typeorm/entity/client'
import findProjectManagers from '../../utils/find-project-managers'
import {nodemailer, typeorm} from '../../library'

const emailProjectManagers = async (clientName: string, clientId: number) => {
    const projectManagers = await findProjectManagers();
    return Promise.all(projectManagers.map(projectManager => {
        nodemailer.newClientNotification(projectManager.email, projectManager.fullName, clientName, clientId);
    }));
}

export default async (request: Request<any, any, Interface.Client.Insert, any>, response: Response, next: NextFunction) => {
    const client = request.body;
    const clientQuery = new typeorm(Client);
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
        await clientQuery.update(client, dbClient.id);
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
