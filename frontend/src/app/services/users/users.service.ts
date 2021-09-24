import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi!: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apiURl + 'user/'
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.urlApi, user)
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.urlApi)
  }

}
