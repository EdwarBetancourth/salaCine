import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';


@Injectable()
export class TicketsService {

  constructor( @InjectRepository(Ticket) private ticketRepository: Repository<Ticket> ) {}

  async create(createTicketDto: CreateTicketDto) {
    const newTicket = this.ticketRepository.create(createTicketDto)
    return await this.ticketRepository.save(newTicket)
  }

  async findAll() {
    return await this.ticketRepository.find()
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
