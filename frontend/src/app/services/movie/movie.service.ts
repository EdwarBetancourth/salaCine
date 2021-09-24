import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlApi!: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apiURl + 'movie/'
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.urlApi, movie)
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.urlApi)
  }

  getOne(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.urlApi + id)
  }

  update(id: number, movie: Movie): Observable<Movie> {
    return this.http.patch<Movie>(this.urlApi + id , movie)
  }

  delete(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.urlApi + id)
  }

}
