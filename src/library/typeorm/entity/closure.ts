import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
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