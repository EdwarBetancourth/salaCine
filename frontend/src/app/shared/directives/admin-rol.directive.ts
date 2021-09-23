import { Directive, ElementRef, OnChanges, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Directive({
  selector: '[appAdminRol]'
})
export class AdminRolDirective {

  nameRol!: string;

  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
    private authService: AuthService
  ) {
    this.nameRol = this.authService.rolAuthenticated();
    if (this.nameRol) {
      if (this.nameRol !== 'admin') {
        this.renderer2.addClass(this.element.nativeElement, 'admin');
      } else {
        this.renderer2.removeClass(this.element.nativeElement, 'admin');
      }
    }
  }

}
