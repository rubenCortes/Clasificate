import { Component, OnInit, Input } from '@angular/core';

import { WindowService } from '../../core';
import * as firebase from 'firebase';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../servicios';
import { UsuarioService } from '../../core';

@Component({
  selector: 'app-formulario-validacion',
  templateUrl: './formulario-validacion.component.html',
  styleUrls: ['./formulario-validacion.component.css']
})
export class FormularioValidacionComponent implements OnInit {

  @Input() anfitrion: string;
   
      private windowRef: any;
  
      config = {
        apiKey: 'AIzaSyD23dLy8QPaFV2bi61LTAkMuy9VNyH1z1o',
        authDomain: 'clasificate-c2664.firebaseapp.com',
        databaseURL: 'https://clasificate-c2664.firebaseio.com',
        projectId: 'clasificate-c2664',
        storageBucket: 'clasificate-c2664.appspot.com',
        messagingSenderId: '1050337382412'
      };
  
      private formularioValidacion: FormGroup;
      private deshabilitarEnviarCod: Boolean = true;
  
      private estadoFormulario: Boolean = false;
  
      private usuario: Usuario = new Usuario();
      private usuarioValidador: any;
  
      private erroresFormulario = {
        'correo': '',
        'correo_repetir': '',
        'clave': '',
        'clave_repetir': '',
        'numero_telefono': '',
        'codigo_validacion': '',
      };
  
      private mensajesValidacion = {
        'correo': {
          'required': 'El correo es requerido.',
          'email': 'Se requiere un formato de correo.'
        },
        'correo_repetir': {
          'required': 'El correo es requerido.',
          'email': 'Se requiere un formato de correo.',
          'noigual': 'Los correos no coinciden.'
        },
        'clave': {
          'required': 'La clave es requerida.',
          'minlength': 'La clave deberá tener una longitud de al menos 4 caracteres.',
          'maxlength': 'La clave deberá tener una longitud máxima de 10 caracteres.'
        },
        'clave_repetir': {
          'required': 'La clave es requerida.',
          'noigual': 'Las claves no coinciden.'
        },
        'numero_telefono': {
          'required': 'El número es requerido.',
          'minlength': 'El número deberá tener una longitud de 11 caracteres.',
          'maxlength': 'El número deberá tener una longitud de 11 caracteres.',
          'pattern': 'El número telefónico solo admite digitos de 0 - 9.',
        },
        'codigo_validacion': {
          'required': 'El código es requerido.'
        }
      };
  
      constructor(  private fb: FormBuilder,
                    private win: WindowService,
                    private datosUsuario: UsuarioService,
                    private router: Router ) {
        this.construyeFormulario();
  
        this.formularioValidacion.get('correo_repetir').
        setValidators([Validators.required, Validators.email, this.validarRepeticionValor('correo')]);
  
        this.formularioValidacion.get('clave_repetir').
        setValidators([Validators.required, this.validarRepeticionValor('clave')]);
  
      }
  
  
      validarRepeticionValor(nombreControl: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
          const claveAnterior: string = this.formularioValidacion.get(nombreControl).value;
          const diferentes: Boolean = claveAnterior !== control.value;
          return diferentes ? {'noigual': {value: control.value}} : null;
        };
      }
  
      private construyeFormulario(): void {
  
        this.formularioValidacion = this.fb.group({
          'correo': ['', [Validators.required, Validators.email] ],
          'correo_repetir': ['', [Validators.required] ],
          'clave': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)] ] ,
          'clave_repetir': ['', [Validators.required] ],
          'numero_telefono': ['', [Validators.required, Validators.minLength(10),
                    Validators.maxLength(10), Validators.pattern(/^\d{10}/)] ],
          'codigo_validacion': ['', [Validators.required] ]
        });
  
        this.formularioValidacion.valueChanges.subscribe(data => this.alCambiarValor(data));
  
        this.formularioValidacion.get('correo').
        valueChanges.subscribe(data => this.formularioValidacion.get('correo_repetir').reset() );
  
        this.formularioValidacion.get('clave').
        valueChanges.subscribe(data => this.formularioValidacion.get('clave_repetir').reset() );
  
      }
  
      alCambiarValor(data?: any) {
        if (!this.formularioValidacion) { return; }
        const formulario: FormGroup = this.formularioValidacion;
  
        for (const campo in this.erroresFormulario) {
          if ( campo in this.erroresFormulario ) {
            const control: AbstractControl = formulario.get(campo);
            this.erroresFormulario[campo] = '';
            if (control && control.dirty && !control.valid) {
              const mensajes: string = this.mensajesValidacion[campo];
              for (const error in control.errors) {
                if ( error in control.errors ) {
                  this.erroresFormulario[campo] += mensajes[error] + ' ';
                }
              }
            }
          }
  
        }
  
        this.estadoFormulario = false;
        if (this.formularioValidacion.status === 'VALID') {
          this.estadoFormulario = true;
        }
  
        this.deshabilitarEnviarCod = true;
        const validacion: Boolean = (this.formularioValidacion.get('numero_telefono').valid) && (this.windowRef.recaptchaVerifier);
        if (validacion) {
          this.deshabilitarEnviarCod = false;
        }
  
      }
  
      ngOnInit() {
        firebase.initializeApp(this.config);
        this.windowRef = this.win.windowRef;
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        this.windowRef.recaptchaVerifier.render();
      }
  
      enviarCodigo() {
        alert('Botón enviar código de validación ...');
        const appVerifier = this.windowRef.recaptchaVerifier;
        const num = '+58' + this.formularioValidacion.get('numero_telefono').value;
  
        firebase.auth().signInWithPhoneNumber(num, appVerifier).
        then(result => { this.windowRef.confirmationResult = result; }).
        catch(error => console.log(error));
      }
  
      onSubmit() {
  
        const codigo: string = this.formularioValidacion.get('codigo_validacion').value;
        this.windowRef.confirmationResult.confirm(codigo).
        then( result => this.alValidar(result.user) ).
        catch( error => alert(error + ' Código incorrecto.') );
  
      }
  
      private alValidar(resultado: any) {
  
        const formulario = this.formularioValidacion.value;
  
        const usuarioValidado: Usuario = new Usuario();
        usuarioValidado.correo = formulario.correo as string;
        usuarioValidado.contrasenia = formulario.clave as string;
        usuarioValidado.telefono = formulario.numero_telefono as string;
  
        this.datosUsuario.usuarioCompartido = usuarioValidado;
  
        if (this.anfitrion === 'validar') {
          this.router.navigate(['/usuario/registrar']);
        }
  
      }
  
      revert(): void {
        this.router.navigate(['/clasificados']);
      }
  
      pruebaRuteo() {
        this.router.navigate(['/usuario/registrar']);
      }
  

}
