import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'
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
export class DesignLink {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    design!: Design;
    @ManyToOne(() => CustomDesignReferral, customDesignReferral => customDesignReferral.designs)
    customDesignId!: CustomDesignReferral;
}

@Entity()
export class OTDocument {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => OTReferral, otReferral => otReferral.documents)
    referralOtIId!: OTReferral;
    @Column()
    docType!: OTDocType;
    @Column()
    docLink!: string;
}

@Entity()
export class CustomDesignReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    referralId!: number;
    @Column()
    productType!: string;
    @Column()
    concept!: string;
    @OneToMany(() => DesignLink, designLink => designLink.customDesignId)
    designs!: DesignLink[];
}

@Entity()
export class EquipmentReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Referral, referral => referral.equipmentReferrals)
    referralId!: Referral;
    @Column()
    product!: string;
    @Column()
    modifications!: string;
}

@Entity()
export class OTReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Referral, referral => referral.OTReferrals)
    referralId!: Referral;
    @Column()
    focus!: string;
    @Column()
    disability?: string;
    @Column()
    therapyGoals!: string;
    @Column()
    clientGoals!: string;
    @Column()
    billableHours!: BillableHours;
    @Column()
    bikeHeight?: number;
    @Column()
    bikeWidth?: number;
    @OneToMany(() => OTDocument, otDocument => otDocument.referralOtIId)
    documents!: OTDocument[];
}

@Entity()
export class ServiceReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Referral, referral => referral.services)
    referralId!: Referral;
    @Column()
    serviceType!: ServiceType;
    @Column()
    serviceDescription!: string;
    @Column()
    serialNumber?: string;
}

@Entity()
export class Referral {
    @PrimaryGeneratedColumn()
    id!: number
    @ManyToOne(() => Client, client => client.referrals)
    clientId!: Client
    @OneToMany(() => CustomDesignReferral, customDesignReferral => customDesignReferral.referralId)
    customDesigns!: CustomDesignReferral[]
    @OneToMany(() => EquipmentReferral, equipmentReferral => equipmentReferral.referralId)
    equipmentReferrals?: EquipmentReferral[]
    @OneToMany(() => OTReferral, otReferral => otReferral.referralId)
    OTReferrals?: OTReferral[]
    @OneToMany(() => ServiceReferral, serviceReferral => serviceReferral.referralId)
    services?: ServiceReferral[]
}
