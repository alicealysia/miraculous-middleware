import Enum from '../enum'
import {
    CustomDesignReferral as CustomDesignReferralClass,
    EquipmentReferral as EquipmentReferralClass,
    OTReferral as OTReferralClass,
    ServiceReferral as ServiceReferralClass,
    Referral as ReferralClass,
    DesignLink as DesignLinkClass,
    OTDocument as OTDocumentClass
} from '../entity/referral'

import {Client as ClientClass} from '../entity/client'

export namespace DesignLink {
    export interface Insert extends ChildCreate {
        customDesign: CustomDesignReferralClass;
    }
    export interface ChildCreate {
        design: Enum.Design;
    }
}

export namespace OTDocument {
    export interface Insert extends ChildCreate {
        otReferral: OTReferralClass;
    }
    export interface ChildCreate {
        docType: Enum.OTDocType;
        docLink: string;
    }
}

export namespace CustomDesignReferral {
    export interface Insert extends ChildCreate {
        referral: ReferralClass;
    }
    export interface ChildCreate {
        productType: string;
        concept: string;
        designs: (DesignLinkClass | DesignLink.ChildCreate)[];
    }
}

export namespace EquipmentReferral {
    export interface Insert extends ChildCreate {
        referral: ReferralClass;
    }
    export interface ChildCreate {
        product: string;
        modifications: string;
    }
}


export namespace OTReferral {
    export interface Insert extends ChildCreate{
        referral: ReferralClass;
    }
    export interface ChildCreate {
        focus: string;
        disability?: string;
        therapyGoals: string;
        clientGoals: string;
        billableHours: Enum.BillableHours;
        bikeHeight?: number;
        bikeWidth?: number;
        documents: (OTDocumentClass | OTDocument.ChildCreate)[];
    }
}


export namespace ServiceReferral {
    export interface Insert extends ChildCreate {
        referral: ReferralClass;
    }
    export interface ChildCreate {
        serviceType: Enum.ServiceType;
        serviceDescription: string;
        serialNumber?: string;
    }
}

export namespace Referral {
    export interface Insert extends ChildCreate{
        client: ClientClass;
    }
    export interface ChildCreate {
        customDesigns?: (CustomDesignReferralClass | CustomDesignReferral.ChildCreate)[];
        equipmentReferrals?: (EquipmentReferralClass | EquipmentReferral.ChildCreate)[];
        OTReferrals?: (OTReferralClass | OTReferral.ChildCreate)[];
        services?: (ServiceReferralClass | ServiceReferral.ChildCreate)[];
    }
}