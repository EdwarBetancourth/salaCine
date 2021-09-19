import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces';

@Component({
  selector: 'app-small-movie',
  templateUrl: './small-movie.component.html',
  styleUrls: ['./small-movie.component.scss']
})
export class SmallMovieComponent implements OnInit {

  @Input() movie!: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
