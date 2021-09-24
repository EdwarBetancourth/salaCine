import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Concurrent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {type: 'int', nullable: false })
    ticket_id: number;


    @Column( {type: 'int', nullable: false })
    user_id: number;

}
