import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import decode from "jwt-decode";
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
    this.urlApi = environment.apiURl + 'auth/'
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.urlApi + 'login', user)
      .pipe(tap((accessToken: any) => {
        localStorage.setItem('access_token', accessToken['access_token'])
        let payload: any = decode(accessToken['access_token'])
        localStorage.setItem('id_user', payload.payload.id)
      }))
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.urlApi + 'signup', user)
      .pipe(tap((accessToken: any) => {
        localStorage.setItem('access_token', accessToken['access_token'])
        let payload: any = decode(accessToken['access_token'])
        localStorage.setItem('id_user', payload.payload.id)
      }))
  }

  recover(user: any): Observable<any> {
    return this.http.post<any>(this.urlApi + 'recover', user)
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_user')
    this.router.navigate(['pages/login']);
  }

  rolAuthenticated() {
    let access_token = localStorage.getItem('access_token')
    if (access_token) {
      let payload: any = decode(access_token)
      console.log(payload)
      return payload.payload.rol
    }
  }

  isAuthenticated(): boolean {
    let access_token = localStorage.getItem('access_token')
    if (access_token) {
      let payload: any = decode(access_token)
      let expire = new Date(payload.exp * 1000);
      let hoy = new Date()
      if (hoy > expire) {
        this.alertService.alertError('Su token a caducado');
        this.logout();
        return false
      }
      return true
    } else {
      return false;
    }
  }


}
