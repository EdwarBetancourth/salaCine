import { FormGroup } from '@angular/forms'

export function MustMatch (password: string, passwordc: string){
    return (fg: FormGroup) => {
        const control_pass = fg.controls[password];
        const control_pasc = fg.controls[passwordc];

        if (control_pasc.errors && !control_pasc.errors.mustMatch){
            return;
        }

        if (control_pass.value !== control_pasc.value){
            control_pasc.setErrors( { mustMatch: true } )
        } else {
            control_pasc.setErrors( null )
        }
    }

}