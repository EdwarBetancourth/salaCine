import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [MovieModule, RoomModule, UserModule, TicketsModule]
})
export class RoutesModule {}
