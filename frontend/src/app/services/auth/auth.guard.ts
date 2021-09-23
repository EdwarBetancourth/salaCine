import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  nameRol!: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService, 
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/content']);
      return false
    }
    else {
      return true;
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.nameRol = this.authService.rolAuthenticated();
    if (this.nameRol) {
      if (this.nameRol !== 'admin') {
        this.alertService.alertError('No tienes permiso para ingresar a este menú');
        this.router.navigate(['/full']);
        return false;
      } else {
        return true;
      }
    }
    return false;
  }



}
