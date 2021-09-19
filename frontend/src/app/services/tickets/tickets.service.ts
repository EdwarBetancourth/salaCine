import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private urlApi!: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apiURl + 'tickets/'
  }

  create(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.urlApi, ticket)
  }

  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.urlApi)
  }


}
