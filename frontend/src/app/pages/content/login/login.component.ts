import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  formLogin!: FormGroup;
  rememberme!: User;
  listSubscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm()
  }

  ngOnDestroy(): void {
    this.listSubscription.forEach(s => s.unsubscribe)
  }

  ngOnInit(): void {
    this.getRemember()
  }

  buildForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  get controls() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.validRemember()
    if (this.formLogin.valid) {
      const sub$1 = this.authService.login(this.formLogin.value).subscribe(() => {
        this.router.navigate(['full'])
      })
      this.listSubscription.push(sub$1)
    }
  }

  validRemember() {
    if (this.formLogin.value.remember) {
      localStorage.setItem('remember', JSON.stringify(this.formLogin.value))
    } else {
      localStorage.removeItem('remember')
    }
  }

  getRemember() {
    let obj = localStorage.getItem('remember')
    if (obj) this.rememberme = JSON.parse(obj)
    if (this.rememberme) {
      this.formLogin.setValue(this.rememberme)
    }
  }

}
