import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:  'varchar', nullable: false})
    name: string;

    @Column({ type:  'varchar', nullable: false})
    lastname: string;

    @Column({ type:  'varchar', nullable: false})
    username: string;

    @Column({ type:  'varchar', nullable: false})
    password:string;

    @Column({ type:  'varchar', nullable: false})
    rol: string;

}
