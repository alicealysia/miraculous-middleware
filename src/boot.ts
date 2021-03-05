import database from './library/database'
import {milliseconds} from 'date-fns'
import {BillableHours, Design, OTDocType, Referral, ServiceType} from './types'

export const bootFunc = async () => {
    console.log(await database.closure.read(2));
}