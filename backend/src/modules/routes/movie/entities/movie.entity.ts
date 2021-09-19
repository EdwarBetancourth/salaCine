import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Movie')
export class Movie {

    @PrimaryGeneratedColumn()
    code: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    image: string;

}
