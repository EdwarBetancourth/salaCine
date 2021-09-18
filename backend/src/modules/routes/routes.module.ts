import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MovieModule, RoomModule, UserModule]
})
export class RoutesModule {}
