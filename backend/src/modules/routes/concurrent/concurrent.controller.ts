import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcurrentService } from './concurrent.service';
import { CreateConcurrentDto } from './dto/create-concurrent.dto';
import { UpdateConcurrentDto } from './dto/update-concurrent.dto';

@Controller('concurrent')
export class ConcurrentController {
  constructor(private readonly concurrentService: ConcurrentService) {}

  @Post()
  create(@Body() createConcurrentDto: CreateConcurrentDto) {
    return this.concurrentService.create(createConcurrentDto);
  }

  @Get()
  findAll() {
    return this.concurrentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concurrentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcurrentDto: UpdateConcurrentDto) {
    return this.concurrentService.update(+id, updateConcurrentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concurrentService.remove(+id);
  }
}
