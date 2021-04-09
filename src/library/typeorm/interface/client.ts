import {Service as ServiceEnum, Funding, NDIS} from '../enum/client'
import {Referral, SharepointLink, Service, Project, Closure, Client} from '../entity'

export namespace Service {
    interface Insert {
        service: ServiceEnum;
        client: Client;
    }
    interface Update {
        service?: ServiceEnum;
        client?: Client;
    }
}

export namespace Client {
    interface Insert {
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
        referrals: Referral[];
        approvals: SharepointLink[];
        services: Service[];
        projects: Project[];
        closures: Closure[];
    }
    interface Update {
        fullName?: string;
        DOB?: Date;
        address?: string;
        phone?: string;
        email?: string;
        supportCoordinator?: string;
        funding?: Funding;
        NDIS?: NDIS;
        orgName?: string;
        gender?: string;
        occupation?: string;
        disability?: string;
        referrals?: Referral[];
        approvals?: SharepointLink[];
        services?: Service[];
        projects?: Project[];
        closures?: Closure[];
    }
}