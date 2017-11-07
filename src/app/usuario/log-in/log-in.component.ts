import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

import { UsuarioService } from '../../core';
import { Usuario } from '../../servicios';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  private usuarioLogueado: Observable<Usuario>;

  private validarFormulario: FormGroup;

  private estadoFormulario: Boolean = false;
  private validador: {correo: string, clave: string};
  private contadorIntentos = 1;
  private erroresFormulario = {
    'correo': '',
    'clave': ''
  };

  private mensajesValidacion = {
    'correo': {
      'required': 'El correo es requerido.',
      'email': 'Se requiere un formato de correo.'
    },
    'clave': {
      'required': 'La clave es requerida.',
      'minlength': 'La clave deberá tener una longitud de al menos 4 caracteres.',
      'maxlength': 'La clave deberá tener una longitud máxima de 10 caracteres.'
    }
  };

  constructor(  private fb: FormBuilder,
                private router: Router,
                private autenticacion: UsuarioService) { }

  ngOnInit() {
    this.validador = {correo: '', clave: ''};
    this.usuarioLogueado = this.autenticacion.obtenerUsuarioLogueado();
    this.construyeFormulario();

  }

  construyeFormulario(): void {

    this.validarFormulario = this.fb.group({
      'correo': [this.validador.correo, [ Validators.required, Validators.email ]],
      'clave': [this.validador.clave, [ Validators.required, Validators.minLength(4), Validators.maxLength(10) ]]
    });

    this.validarFormulario.valueChanges.subscribe(data => this.alCambiarValor(data));
  }

  alCambiarValor(data?: any) {
    if (!this.validarFormulario) { return; }
    const formulario: FormGroup = this.validarFormulario;

    for (const campo in this.erroresFormulario) {
      if (campo in this.erroresFormulario) {
        const control: AbstractControl = formulario.get(campo);
        this.erroresFormulario[campo] = '';
        if (control && control.dirty && !control.valid) {
          const mensajes: string = this.mensajesValidacion[campo];
          for (const error in control.errors) {
            if (error in control.errors) {
              this.erroresFormulario[campo] += mensajes[error] + ' ';
            }
          }
        }
      }
    }

    this.estadoFormulario = false;
    if (this.validarFormulario.status === 'VALID') {
      this.estadoFormulario = true;
    }
  }

  onSubmit() {
    const destino: string = this.autenticacion.urlDestino;
    this.validador = this.validarFormulario.value;
    this.autenticacion.login(this.validador.correo, this.validador.clave)
    .subscribe(() => this.router.navigate([destino]),
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('Ha ocurrido un error:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Código de error ${err.status}, mensaje: ${err.error}`);
        if (this.contadorIntentos < 3) {
          alert('Tiene: ' +  (3 - this.contadorIntentos) + ' intentos más.' );
          this.contadorIntentos += 1;
        } else {
          this.revert();
        }
      }
    });

  }

  // Redirige a la página CLASIFICADOS
  revert() {
    this.router.navigate(['/categoria']);
  }

  private actualizarValidador() {
    const formularioDatos = this.validarFormulario.value;
  }

  get correo() { return this.validarFormulario.get('correo'); }

  get clave() { return this.validarFormulario.get('clave'); }

}
