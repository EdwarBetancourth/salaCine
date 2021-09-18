import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  rememberme!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router
    ) {
      this.buildForm()
    }

  ngOnInit(): void {
    this.getRemember()
  }

  buildForm(){
    this.formLogin = this.fb.group({
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
      remember: [false]
    })
  }

  get controls() {
    return this.formLogin.controls;
  }

  onSubmit(){
    this.validRemember()
    if (this.formLogin.valid) {
      console.log(this.formLogin.value)
    }
    this.router.navigate(['full'])
  }

  validRemember () {
    if (this.formLogin.value.remember) {
      localStorage.setItem('remember', JSON.stringify(this.formLogin.value))
    }else {
      localStorage.removeItem('remember')
    }
  }

  getRemember () {
    let obj =  localStorage.getItem('remember')
    if (obj) this.rememberme = JSON.parse(obj)
    if (this.rememberme) {
      this.formLogin.setValue(this.rememberme)
    }
  }

}
