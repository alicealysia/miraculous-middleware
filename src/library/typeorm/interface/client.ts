import {Service as ServiceEnum, Funding, NDIS} from '../enum/client'
import Entity from '../entity'
import { Closure, Project, Referral } from './ns-interface'

export namespace Service {
    export interface Insert extends ChildCreate {
        client: Entity.Client;
    }
    export interface Update {
        service?: ServiceEnum;
        client?: Entity.Client;
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
        referrals: (Entity.Referral | Referral.ChildCreate)[];
        approvals: (Entity.SharepointLink | SharepointLink.Insert)[];
        services: (Entity.Service | Service.ChildCreate)[];
        projects: (Entity.Project | Project.ChildCreate)[];
        closures: (Entity.Closure | Closure.ChildCreate)[];
    }
}