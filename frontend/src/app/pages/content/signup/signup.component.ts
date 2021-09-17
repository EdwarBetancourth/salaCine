import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  formSignup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm()
  }

  buildForm() {
    this.formSignup = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordc: ['', [Validators.required]],
      acepted: [false, Validators.requiredTrue],
    }, {
      validator: this.passwordMatchValidator('password', 'passwordc')
    })
  }

  get controls() {
    return this.formSignup.controls;
  }

  onSubmit(){
    console.log(this.formSignup.valid)
    console.log(this.formSignup.invalid)
    console.log(this.formSignup.value)
  }

  passwordMatchValidator(password: string, passwordc: string) {
    return (formGroup: FormGroup) => {
      const control_password = formGroup.controls[password];
			const control_passwordc = formGroup.controls[passwordc];
      if (control_password.value !== control_passwordc.value) {
				control_passwordc.setErrors({ validaPass: true });
			} else {
				control_passwordc.setErrors(null);
			}
    }
  }

}
