export enum Service {
    Project = 0,
    Builder = 1,
    OccupationalTherapist = 2
}

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



export interface Client {
    id?: number;
    fullName: string;
    DOB: Date;
    address: string;
    phone: string;
    email: string;
    supportCoordinator: number;
    funding: Funding;
    NDIS: NDIS;
    orgName: string;
    gender: string;
    occupation: string;
    disability: string;
    referrals?: string[];
    approvals?: string[];
    services?: Service[];
}