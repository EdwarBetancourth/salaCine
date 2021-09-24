import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConcurrentDto } from './dto/create-concurrent.dto';
import { UpdateConcurrentDto } from './dto/update-concurrent.dto';
import { Concurrent } from './entities/concurrent.entity';

@Injectable()
export class ConcurrentService {

  constructor(@InjectRepository(Concurrent) private concurrentRepository: Repository<Concurrent> ) {
  }

  async create(createConcurrentDto: CreateConcurrentDto) {
    const newMovie = this.concurrentRepository.create(createConcurrentDto);
    return await this.concurrentRepository.save(newMovie);
  }

  async findAll() {
    return await this.concurrentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} concurrent`;
  }

  update(id: number, updateConcurrentDto: UpdateConcurrentDto) {
    return `This action updates a #${id} concurrent`;
  }

  remove(id: number) {
    return `This action removes a #${id} concurrent`;
  }
}
