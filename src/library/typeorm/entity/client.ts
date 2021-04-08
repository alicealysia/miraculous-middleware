import {Referral} from './referral'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'

export enum Funding {
    Private = 0,
    NDIS = 1,
    MyAgedCare = 2,
    DVA = 3,
    Insurance = 4
}

export enum NDIS {
    None = 0,
    Self = 1,
    Plan = 2,
    Agency = 3
}

export enum ServiceEnum {
    NDISorMyAgeCare = 0,
    FreedomWheels = 1,
    OccupationalTherapy = 2,
    AssistiveTechnology = 3,
    DesignAndManufacture = 4,
    EquipmentRefurbishmentsAndModifications = 5,
    RepairOrService = 6
}

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    service!: ServiceEnum;
    @ManyToOne(() => Client, client => client.services)
    clientId!: Client;
}

@Entity()
export class SharepointLink {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    sharepointLink!: string;
}

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    fullName!: string;
    @Column()
    DOB!: Date;
    @Column()
    address!: string;
    @Column()
    phone!: string;
    @Column()
    email!: string;
    @Column()
    supportCoordinator!: string;
    @Column()
    funding!: Funding;
    @Column()
    NDIS!: NDIS;
    @Column()
    orgName!: string;
    @Column()
    gender!: string;
    @Column()
    occupation!: string;
    @Column()
    disability!: string;
    @OneToMany(() => Referral, referral => referral.clientId)
    referrals!: Referral[];
    @ManyToMany(() => SharepointLink)
    @JoinTable()
    approvals?: SharepointLink[];
    @OneToMany(() => Service, service => service.clientId)
    services?: Service[];
}