import {Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, ManyToOne} from 'typeorm'
import {Client} from './client'

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

@Entity()
@Tree('nested-set')
export class DesignLink {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column('enum')
    design!: Design;
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
    @Column('enum')
    docType!: OTDocType;
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
    @Column('enum')
    billableHours!: BillableHours;
    @Column()
    bikeHeight?: number;
    @Column()
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
    serviceType!: ServiceType;
    @Column()
    serviceDescription!: string;
    @Column()
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
