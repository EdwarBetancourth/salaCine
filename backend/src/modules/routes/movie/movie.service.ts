import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from './entities/movie.entity'

@Injectable()
export class MovieService {

  constructor( @InjectRepository(Movie) private movieRepository: Repository<Movie> ){}

  async create(createMovieDto: CreateMovieDto) {
    const newMovie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(newMovie);
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne(id);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const updateMovie = await this.movieRepository.findOne(id);
    this.movieRepository.merge(updateMovie, updateMovieDto) 
    return await this.movieRepository.save(updateMovie);
  }

  async remove(id: number) {
    return await this.movieRepository.delete(id)
  }
}
