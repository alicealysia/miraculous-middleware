import database from './database';
import accessControl from './access-control'
import sharepoint from './sharepoint'
import xero from './xero'
import nodemailer from './nodemailer'
import {getConnection} from './typeorm'

const typeorm = {getConnection}

export {database, accessControl, sharepoint, xero, nodemailer, typeorm};