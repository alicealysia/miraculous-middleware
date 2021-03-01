import {Pool} from 'promise-mysql'
import {Project} from '../../../../types'

export default async(connection: Pool, project: Project) => connection.query('call create_project(?, ?, ?, ?, ?, ?, ?, ?)', [
    project.projectName,
    project.projectDescription,
    project.enquiryDate,
    project.startDate,
    project.finishEstimate,
    project.hoursEstimate,
    project.projectType,
    project.clientId
]).then(value => value[0][0].id);
