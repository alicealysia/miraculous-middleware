import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Client } from './client';
import {ProjectType} from './project'


@Entity()
class Closure {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    projectName!: string;
    @Column({length: 1000})
    projectDescription!: string;
    @Column()
    enquiryDate!: Date;
    @Column()
    startDate!: Date;
    @Column()
    finishDate!: Date;
    @Column('enum')
    projectType!: ProjectType;
    @ManyToOne(() => Client, client => client.closures)
    client!: Client;
    @Column()
    totalHours!: number;
    @Column()
    finalReport!: string;
    @Column()
    totalCost!: number;
    @Column()
    totalQuote!: number;
}

export default Closure;