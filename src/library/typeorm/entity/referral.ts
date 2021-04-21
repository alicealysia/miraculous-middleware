import {Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from 'typeorm'
import {Client} from './client'
import Enum from '../enum'
import Interface from '../interface'
import { isThisISOWeek } from 'date-fns';

@Entity()
@Tree('nested-set')
export class DesignLink {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    design!: Enum.Design;
    @TreeParent()
    customDesign!: CustomDesignReferral;
}

@Entity()
@Tree('nested-set')
export class OTDocument {
    @PrimaryGeneratedColumn()
    id!: number;
    @TreeParent()
    otReferral!: OTReferral;
    @Column()
    docType!: Enum.OTDocType;
    @Column()
    docLink!: string;
}

@Entity()
@Tree('nested-set')
export class CustomDesignReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    referral!: number;
    @Column()
    productType!: string;
    @Column()
    concept!: string;
    @TreeChildren({cascade: true})
    designs!: DesignLink[];
}

@Entity()
@Tree('nested-set')
export class EquipmentReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @TreeParent()
    referral!: Referral;
    @Column()
    product!: string;
    @Column()
    modifications!: string;
}

@Entity()
@Tree('nested-set')
export class OTReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @TreeParent()
    referral!: Referral;
    @Column()
    focus!: string;
    @Column()
    disability?: string;
    @Column({length: 1000})
    therapyGoals!: string;
    @Column({length: 1000})
    clientGoals!: string;
    @Column()
    billableHours!: Enum.BillableHours;
    @Column({nullable: true})
    bikeHeight?: number;
    @Column({nullable: true})
    bikeWidth?: number;
    @TreeChildren({cascade: true})
    documents!: OTDocument[];
}

@Entity()
@Tree('nested-set')
export class ServiceReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @TreeParent()
    referral!: Referral;
    @Column()
    serviceType!: Enum.ServiceType;
    @Column()
    serviceDescription!: string;
    @Column({nullable: true})
    serialNumber?: string;
}

@Entity()
@Tree('nested-set')
export class Referral {
    @PrimaryGeneratedColumn()
    id!: number
    @TreeParent()
    client!: Client
    @TreeChildren({cascade: true})
    customDesigns!: CustomDesignReferral[]
    @TreeChildren({cascade: true})
    equipmentReferrals?: EquipmentReferral[]
    @TreeChildren({cascade: true})
    OTReferrals?: OTReferral[]
    @TreeChildren({cascade: true})
    services?: ServiceReferral[]
}
