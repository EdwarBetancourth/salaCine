import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from 'src/app/interfaces';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit, OnDestroy {

  formMovie!: FormGroup;
  listSubscriptions: Subscription[] = [];
  movies: Movie[] = [];
  search: string = "";

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private movieService: MovieService,
    private searchService: SearchService,
    private modalService: NgbModal
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.getAll();
    this.searchTerm();
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach(s => s.unsubscribe());
  }

  searchTerm(): void {
    const sub$ = this.searchService.search.subscribe((val) => this.search = val)
    this.listSubscriptions.push(sub$)
  }

  getAll(): void {
    const sub$ = this.movieService.getAll().subscribe((val) => this.movies = val);
    this.listSubscriptions.push(sub$)
  }

  get controls() {
    return this.formMovie.controls;
  }

  buildForm(): void {
    this.formMovie = this.fb.group({
      code: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  delete(id: number): void {
    const sub$ = this.movieService.delete(id).subscribe(() => {
      this.getAll();
      this.alertService.alertDelete();
    })
    this.listSubscriptions.push(sub$)
  }

  create(): void {
    const sub$ = this.movieService.create(this.formMovie.value).subscribe(() => {
      this.getAll();
      this.alertService.alertSuccess()
      this.formMovie.reset()
    })
    this.listSubscriptions.push(sub$)
  }

  update(): void {
    const sub$ = this.movieService.update(this.formMovie.value.code, this.formMovie.value).subscribe(() => {
      this.getAll();
      this.alertService.alertSuccess()
      this.formMovie.reset()
    })
    this.listSubscriptions.push(sub$)
  }

  onSubmit(): void {
    if (this.formMovie.valid) {
      if (this.formMovie.value.code) {
        this.update()
      } else {
        this.create()
      }
    }
    this.modalService.dismissAll()
  }

  openModal(content: any, movie?: Movie) {
    this.formMovie.reset()
    if (movie) this.formMovie.setValue(movie)
    this.modalService.open(content, { centered: true });
  }

}
