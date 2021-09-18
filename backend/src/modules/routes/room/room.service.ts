import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RoomService {

  constructor( @InjectRepository(Room) private roomRepository: Repository<Room> ){}

  async create(createRoomDto: CreateRoomDto) {
    const newRoom = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(newRoom);
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  async findOne(id: number) {
    return await this.roomRepository.findOne(id);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const updateRoom = await this.roomRepository.findOne(id);
    this.roomRepository.merge(updateRoom, updateRoomDto) 
    return await this.roomRepository.save(updateRoom);
  }

  async remove(id: number) {
    return await this.roomRepository.delete(id);
  }

}
