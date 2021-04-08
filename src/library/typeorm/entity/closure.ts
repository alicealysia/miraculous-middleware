import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import {ProjectType} from '../../../types'


@Entity()
class Closure {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    projectName!: string;
    @Column()
    projectDescription!: string;
    @Column()
    enquiryDate!: Date;
    @Column()
    startDate!: Date;
    @Column()
    finishDate!: Date;
    @Column()
    projectType!: ProjectType;
    @Column()
    clientId!: number;
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