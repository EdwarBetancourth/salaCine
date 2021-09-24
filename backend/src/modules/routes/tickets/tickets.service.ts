import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { RoomService } from '../room/room.service';
import { MovieService } from '../movie/movie.service';


@Injectable()
export class TicketsService {

  constructor( 
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    private roomService: RoomService,
    private movieService: MovieService
   ) {}

  async create(createTicketDto: CreateTicketDto) {
    const newTicket = this.ticketRepository.create(createTicketDto)
    return await this.ticketRepository.save(newTicket)
  }

  async findAll() {
    const tickets : any = await this.ticketRepository.find()
    for (const key in tickets) {
      tickets[key].movie = await this.movieService.findOne(tickets[key].movie_id)
      tickets[key].room = await this.roomService.findOne(tickets[key].room_id)
    }
    return tickets
  }

  async findOne(id: number) {
    return await this.ticketRepository.findOne(id);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const updateTicket = await this.ticketRepository.findOne(id);
    this.ticketRepository.merge(updateTicket, updateTicketDto);
    return await this.ticketRepository.save(updateTicket)
  }

  async remove(id: number) {
    return await this.ticketRepository.delete(id);
  }
  
}
