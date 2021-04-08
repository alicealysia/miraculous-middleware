import {Referral} from './referral'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import { Project } from '.';

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
    @ManyToOne(() => Client, client => client.services, {cascade: true})
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
    @Column({length: 10})
    phone!: string;
    @Column()
    email!: string;
    @Column()
    supportCoordinator!: string;
    @Column('enum')
    funding!: Funding;
    @Column('enum')
    NDIS!: NDIS;
    @Column()
    orgName!: string;
    @Column()
    gender!: string;
    @Column()
    occupation!: string;
    @Column()
    disability!: string;
    @OneToMany(() => Referral, referral => referral.clientId, {cascade: true})
    referrals!: Referral[];
    @ManyToMany(() => SharepointLink,  {cascade: true})
    @JoinTable()
    approvals?: SharepointLink[];
    @OneToMany(() => Service, service => service.clientId,  {cascade: true})
    services?: Service[];
    @ManyToOne(() => Project, project => project.clientId)
    projects!: Project[];
}