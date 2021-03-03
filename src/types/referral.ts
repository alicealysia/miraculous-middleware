export enum Design {
    knittingAid = 0,
    crochetAid = 1,
    poolCue = 2,
    walkerBar = 3
}

export enum OTDocType {
    progressReport = 0,
    NDISPlan = 1,
    medicalLetter = 2
}

export enum BillableHours {
    flexible = 0,
    fixed = 1
}

export enum ServiceType {
    repair = 0,
    service = 1
}

export interface OTDocument {
    id?: number;
    referralOtIId?: number;
    docType: OTDocType;
    docLink: string;
}

export interface CustomDesignReferral {
    id?: number;
    referralId?: number;
    productType: string;
    concept: string;
    designs: Design[];
}

export interface EquipmentReferral {
    id?: number;
    referralId?: number;
    product: string;
    modifications: string;
}

export interface OTReferral {
    id?: number;
    referralId?: number;
    focus: string;
    disability?: string;
    therapyGoals: string;
    clientGoals: string;
    billableHours: BillableHours;
    bikeHeight: number;
    bikeWidth: number;
    documents?: OTDocument[];
}

export interface ServiceReferral {
    id?: number;
    referralId?: number;
    serviceType: ServiceType;
    serviceDescription: string;
    serialNumber?: string;
}

export interface Referral {
    id?: number;
    clientId?: number;
    customDesigns?: CustomDesignReferral[];
    equipmentReferrals?: EquipmentReferral[];
    OTReferrals?: OTReferral[];
    services?: ServiceReferral[];
}
