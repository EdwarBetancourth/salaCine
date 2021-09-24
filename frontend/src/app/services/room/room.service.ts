import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private urlApi!: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apiURl + 'room/'
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.urlApi, room)
  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.urlApi)
  }

  update(id: number, room: Room): Observable<Room> {
    return this.http.patch<Room>(this.urlApi + id , room)
  }

  delete(id: number): Observable<Room> {
    return this.http.delete<Room>(this.urlApi + id)
  }


}
