import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concurrent } from 'src/app/interfaces/currents';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConcurrentService {

  private urlApi!: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apiURl + 'concurrent/'
  }

  create(concurrent: Concurrent): Observable<Concurrent> {
    return this.http.post<Concurrent>(this.urlApi, concurrent)
  }

  getAll(): Observable<Concurrent[]> {
    return this.http.get<Concurrent[]>(this.urlApi)
  }



}
