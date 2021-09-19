import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertError = (message: string) => {
    return Swal.fire('Hubo un problema', message, 'error');
  }

  alertSuccess = () => {
    return Swal.fire('Registro guardado', 'El registro se guardo con exito.', 'success');
  }

}
