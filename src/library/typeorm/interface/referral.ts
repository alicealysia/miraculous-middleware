import Enum from '../enum'
import Entity from '../entity'

export namespace DesignLink {
    export interface Insert extends ChildCreate {
        customDesign: Entity.CustomDesignReferral;
    }
    export interface ChildCreate {
        design: Enum.Design;
    }
}

export namespace OTDocument {
    export interface Insert extends ChildCreate {
        otReferral: Entity.OTReferral;
    }
    export interface ChildCreate {
        docType: Enum.OTDocType;
        docLink: string;
    }
}

export namespace CustomDesignReferral {
    export interface Insert extends ChildCreate {
        referral: Entity.Referral;
    }
    export interface ChildCreate {
        productType: string;
        concept: string;
        designs: (Entity.DesignLink | DesignLink.ChildCreate)[];
    }
}

export namespace EquipmentReferral {
    export interface Insert extends ChildCreate {
        referral: Entity.Referral;
    }
    export interface ChildCreate {
        product: string;
        modifications: string;
    }
}


export namespace OTReferral {
    export interface Insert extends ChildCreate{
        referral: Entity.Referral;
    }
    export interface ChildCreate {
        focus: string;
        disability?: string;
        therapyGoals: string;
        clientGoals: string;
        billableHours: Enum.BillableHours;
        bikeHeight?: number;
        bikeWidth?: number;
        documents: (Entity.OTDocument | OTDocument.ChildCreate)[];
    }
}


export namespace ServiceReferral {
    export interface Insert extends ChildCreate {
        referral: Entity.Referral;
    }
    export interface ChildCreate {
        serviceType: Enum.ServiceType;
        serviceDescription: string;
        serialNumber?: string;
    }
}

export namespace Referral {
    export interface Insert extends ChildCreate{
        client: Entity.Client;
    }
    export interface ChildCreate {
        customDesigns?: (Entity.CustomDesignReferral | CustomDesignReferral.ChildCreate)[];
        equipmentReferrals?: (Entity.EquipmentReferral | EquipmentReferral.ChildCreate)[];
        OTReferrals?: (Entity.OTReferral | OTReferral.ChildCreate)[];
        services?: (Entity.ServiceReferral | ServiceReferral.ChildCreate)[];
    }
}