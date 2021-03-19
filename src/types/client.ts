import {Referral} from './referral'

export enum Funding {
    Private = 0,
    NDIS = 1,
    MyAgedCare = 2,
    DVA = 3,
    Insurance = 4
}

export enum NDIS {
    None = 0,
    Self = 1,
    Plan = 2,
    Agency = 3
}

export enum Service {
    NDISorMyAgeCare = 0,
    FreedomWheels = 1,
    OccupationalTherapy = 2,
    AssistiveTechnology = 3,
    DesignAndManufacture = 4,
    EquipmentRefurbishmentsAndModifications = 5,
    RepairOrService = 6
}

export interface Client {
    id: number;
    fullName: string;
    DOB: Date;
    address: string;
    phone: string;
    email: string;
    supportCoordinator: string;
    funding: Funding;
    NDIS: NDIS;
    orgName: string;
    gender: string;
    occupation: string;
    disability: string;
    referrals?: Referral[];
    approvals?: string[];
    services?: Service[];
}

export interface InsertClient {
    fullName: string;
    DOB: Date;
    address: string;
    phone: string;
    email: string;
    supportCoordinator: string;
    funding: Funding;
    NDIS: NDIS;
    orgName: string;
    gender: string;
    occupation: string;
    disability: string;
    referrals?: Referral[];
    approvals?: string[];
    services?: Service[];
}

export const isClient = (obj: any): obj is Client => true;
export const isInsertClient = (obj: any): obj is InsertClient => true;