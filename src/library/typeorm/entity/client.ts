import {Referral} from './referral'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import {Client as IClient, Service as IService} from '../interface/client'
import {Service as EService, Funding as EFunding, NDIS as ENDIS} from '../enum/client'
import { Project } from './project';
import Closure from './closure';

@Entity()
export class Service {
    @PrimaryGeneratedColumn('increment')
    id!: number;
    @Column()
    service!: EService;
    @ManyToOne(() => Client, client => client.services)
    client!: Client;
    public update(changes: IService.Update) {
        this.service = changes.service ?? this.service;
        this.client = changes.client ?? this.client;
    }
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
    @Column()
    funding!: EFunding;
    @Column()
    NDIS!: ENDIS;
    @Column()
    orgName!: string;
    @Column()
    gender!: string;
    @Column()
    occupation!: string;
    @Column()
    disability!: string;
    @OneToMany(() => Referral, referral => referral.client, {cascade: true})
    referrals?: Referral[];
    @ManyToMany(() => SharepointLink,  {cascade: true})
    @JoinTable()
    approvals?: SharepointLink[];
    @OneToMany(() => Service, service => service.client,  {cascade: true})
    services?: Service[];
    @ManyToOne(() => Project, project => project.client)
    projects?: Project[];
    @OneToMany(() => Closure, closure => closure.client)
    closures?: Closure[];
}