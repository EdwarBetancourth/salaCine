import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movie/entities/movie.entity';
import { MovieService } from '../movie/movie.service';
import { RoomService } from '../room/room.service';
import { Room } from '../room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Movie, Room])],
  controllers: [TicketsController],
  providers: [TicketsService, MovieService, RoomService]
})
export class TicketsModule {}
