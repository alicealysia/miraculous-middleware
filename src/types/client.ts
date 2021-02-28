export enum Service {
    Project = 0,
    Builder = 1,
    'Occupational Therapist' = 2
}

export enum Funding {
    Private = 0,
    NDIS = 1,
    'My Aged Care' = 2,
    DVA = 3,
    Insurance = 4
}

export enum NDIS {
    Self = 0,
    Plan = 1,
    Agency = 2
}



export interface Client {
    id?: number;
    fullName: string;
    DOB: Date;
    address: string;
    phone: number;
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