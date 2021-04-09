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
    @Column('enum')
    design!: Design;
    @ManyToOne(() => CustomDesignReferral, customDesignReferral => customDesignReferral.designs, {cascade: true})
    customDesign!: CustomDesignReferral;
}

@Entity()
export class OTDocument {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => OTReferral, otReferral => otReferral.documents, {cascade: true})
    otReferral!: OTReferral;
    @Column('enum')
    docType!: OTDocType;
    @Column()
    docLink!: string;
}

@Entity()
export class CustomDesignReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    referral!: number;
    @Column()
    productType!: string;
    @Column()
    concept!: string;
    @OneToMany(() => DesignLink, designLink => designLink.customDesign, {cascade: true})
    designs!: DesignLink[];
}

@Entity()
export class EquipmentReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Referral, referral => referral.equipmentReferrals, {cascade: true})
    referral!: Referral;
    @Column()
    product!: string;
    @Column()
    modifications!: string;
}

@Entity()
export class OTReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Referral, referral => referral.OTReferrals, {cascade: true})
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
    @OneToMany(() => OTDocument, otDocument => otDocument.otReferral, {cascade: true})
    documents!: OTDocument[];
}

@Entity()
export class ServiceReferral {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Referral, referral => referral.services, {cascade: true})
    referral!: Referral;
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
    @ManyToOne(() => Client, client => client.referrals, {cascade: true})
    client!: Client
    @OneToMany(() => CustomDesignReferral, customDesignReferral => customDesignReferral.referral, {cascade: true})
    customDesigns!: CustomDesignReferral[]
    @OneToMany(() => EquipmentReferral, equipmentReferral => equipmentReferral.referral, {cascade: true})
    equipmentReferrals?: EquipmentReferral[]
    @OneToMany(() => OTReferral, otReferral => otReferral.referral, {cascade: true})
    OTReferrals?: OTReferral[]
    @OneToMany(() => ServiceReferral, serviceReferral => serviceReferral.referral, {cascade: true})
    services?: ServiceReferral[]
}
