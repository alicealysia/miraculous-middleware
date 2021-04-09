import {Referral} from './referral'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import {Client as IClient, Service as IService} from '../interface/client'
import { Project } from '.';
import Closure from './closure';

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    service: ServiceEnum;
    @ManyToOne(() => Client, client => client.services, {cascade: true})
    client: Client;

    constructor (values: IService) {
        this.service = values.service;
        this.client = values.client;
    }

    public update(changes: UService) {
        this.service = changes.service ?? this.service;
        this.client = changes.client ?? this.client;
    }
}

@Entity()
export class SharepointLink {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    sharepointLink!: string;

    constructor (sharepointLink: string) {
        this.sharepointLink = sharepointLink;
    }
    public update (changes: string) {
        this.sharepointLink = changes;
    }
}

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    fullName: string;
    @Column()
    DOB: Date;
    @Column()
    address: string;
    @Column({length: 10})
    phone: string;
    @Column()
    email: string;
    @Column()
    supportCoordinator: string;
    @Column('enum')
    funding: Funding;
    @Column('enum')
    NDIS: NDIS;
    @Column()
    orgName: string;
    @Column()
    gender: string;
    @Column()
    occupation: string;
    @Column()
    disability: string;
    @OneToMany(() => Referral, referral => referral.client, {cascade: true})
    referrals: Referral[];
    @ManyToMany(() => SharepointLink,  {cascade: true})
    @JoinTable()
    approvals?: SharepointLink[];
    @OneToMany(() => Service, service => service.client,  {cascade: true})
    services?: Service[];
    @ManyToOne(() => Project, project => project.client)
    projects: Project[];
    @OneToMany(() => Closure, closure => closure.client)
    closures: Closure[];
    constructor (values: IClient) {
        this.fullName = values.fullName
        this.DOB = values.DOB
        this.address = values.address
        this.phone = values.phone
        this.email = values.email
        this.supportCoordinator = values.supportCoordinator
        this.funding = values.funding
        this.NDIS = values.NDIS
        this.orgName = values.orgName
        this.gender = values.gender
        this.occupation = values.occupation
        this.disability = values.disability
        this.referrals = values.referrals
        this.approvals = values.approvals
        this.services = values.services
        this.projects = values.projects
        this.closures = values.closures
    }
    public update (values: UClient) {
        this.fullName = values.fullName ?? this.fullName
        this.DOB = values.DOB ?? this.DOB
        this.address = values.address ?? this.address
        this.phone = values.phone ?? this.phone
        this.email = values.email ?? this.email
        this.supportCoordinator = values.supportCoordinator ?? this.supportCoordinator
        this.funding = values.funding ?? this.funding
        this.NDIS = values.NDIS ?? this.NDIS
        this.orgName = values.orgName ?? this.orgName
        this.gender = values.gender ?? this.gender
        this.occupation = values.occupation ?? this.occupation
        this.disability = values.disability ?? this.disability
        this.referrals = values.referrals ?? this.referrals
        this.approvals = values.approvals ?? this.approvals
        this.services = values.services ?? this.services
        this.projects = values.projects ?? this.projects
        this.closures = values.closures ?? this.closures
    }
}