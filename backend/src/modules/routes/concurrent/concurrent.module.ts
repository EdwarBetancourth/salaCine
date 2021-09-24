import { Module } from '@nestjs/common';
import { ConcurrentService } from './concurrent.service';
import { ConcurrentController } from './concurrent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concurrent } from './entities/concurrent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concurrent])],
  controllers: [ConcurrentController],
  providers: [ConcurrentService]
})
export class ConcurrentModule {}
