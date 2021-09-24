import { PartialType } from '@nestjs/mapped-types';
import { CreateConcurrentDto } from './create-concurrent.dto';

export class UpdateConcurrentDto extends PartialType(CreateConcurrentDto) {}
