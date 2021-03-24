import assignmentQuery from './assignment'
import materialQuery from './material'
import materialEstimateQuery from './estimateMaterial'
import details from './details'
import quotes from './quote'
import invoices from './invoice'
import {getPool} from '../../pool'
import {InsertProject, InsertAssignment, AssignMaterial} from '../../../../types'

const create = async(project: InsertProject) => {
    const connection = await getPool();
    const projectId = await details(connection, project);
    if (project.assignments) {
        await Promise.all(project.assignments.map(assignment => assignmentQuery(connection, projectId, assignment)));
    }
    if (project.materials) {
        Promise.all(project.materials.map(material => materialQuery(connection, projectId, material)));
    }
    if (project.materialsEstimate) {
        Promise.all(project.materialsEstimate.map(material => materialEstimateQuery(connection, projectId, material)));
    }
    if (project.quotes) {
        Promise.all(project.quotes.map(item => quotes(connection, projectId, item)));
    }
    if (project.invoices) {
        const amount = project.amountInvoiced / project.invoices.length;
        Promise.all(project.invoices.map(item => invoices(connection, projectId, item, amount)));
    }
    return projectId;
}

const user = async(projectId:number, _assignment: InsertAssignment) => {
    const connection = await getPool();
    return assignmentQuery(connection, projectId, _assignment);
}

const material = async(projectId: number, material: AssignMaterial) => {
    const pool = await getPool();
    return materialQuery(pool, projectId, material);
}

const materialEstimate = async(projectId: number, material: AssignMaterial) => {
    const pool = await getPool();
    return materialEstimateQuery(pool, projectId, material);
}

const quote = async(projectId: number, quoteId: string) => {
    const pool = await getPool();
    return quotes(pool, projectId, quoteId);
}

const invoice = async(projectId: number, invoiceId: string, amount: number) => {
    const pool = await getPool();
    return invoices(pool, projectId, invoiceId, amount);
}

const assign = {user, material, materialEstimate, quote, invoice};

export {create, assign};
