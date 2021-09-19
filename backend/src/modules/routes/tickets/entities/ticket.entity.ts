import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('ticket')
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false})
    movie_id: number;

    @Column({ type:  'int', nullable: false })
    room_id: number;

    @Column({ type:  'int', nullable: false })
    hour: number;
}
