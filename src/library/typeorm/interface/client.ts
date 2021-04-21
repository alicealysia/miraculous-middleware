import {Service as ServiceEnum, Funding, NDIS} from '../enum/client'
import {Client, SharepointLink as SharepointLinkClass, Service as ServiceClass} from '../entity/client'
import {Referral as ReferralClass} from '../entity/referral'
import {Project as ProjectClass} from '../entity/project'
import ClosureClass from '../entity/closure'
import { Closure, Project, Referral } from './ns-interface'

export namespace Service {
    export interface Insert extends ChildCreate {
        client: Client;
    }
    export interface Update {
        service?: ServiceEnum;
        client?: Client;
    }
    export interface ChildCreate {
        service: ServiceEnum;
    }
}

export namespace SharepointLink {
    export interface Insert {
        sharepointLink: string;
    }
    export interface Update {
        id: number;
        sharepointLink: string;
    }
}

export namespace Client {
    export interface Insert {
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
        referrals: (ReferralClass | Referral.ChildCreate)[];
        approvals: (SharepointLinkClass | SharepointLink.Insert)[];
        services: (ServiceClass | Service.ChildCreate)[];
        projects: (ProjectClass | Project.ChildCreate)[];
        closures: (ClosureClass | Closure.ChildCreate)[];
    }
}