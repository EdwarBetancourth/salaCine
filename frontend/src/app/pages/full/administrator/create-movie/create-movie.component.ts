import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnDestroy {

  formMovie!: FormGroup;
  listSubscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private movieService: MovieService
  ) {
    this.buildForm()
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach(s => s.unsubscribe());
  }

  get controls() {
    return this.formMovie.controls;
  }

  buildForm(): void {
    this.formMovie = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.formMovie.valid) {
      const sub$ = this.movieService.create(this.formMovie.value).subscribe(() => {
        this.alertService.alertSuccess()
        this.formMovie.reset()
      })
      this.listSubscriptions.push( sub$ )
    }
  }

}
