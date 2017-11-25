import { Component, OnInit } from '@angular/core';

import { WindowService } from '../../core';
import * as firebase from 'firebase';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../servicios';
import { UsuarioService } from '../../core';


@Component({
  selector: 'app-modificar-telefono',
  templateUrl: './modificar-telefono.component.html',
  styleUrls: ['./modificar-telefono.component.css']
})
export class ModificarTelefonoComponent implements OnInit {

  
     private windowRef: any;
 
     config = {
       apiKey: 'AIzaSyD23dLy8QPaFV2bi61LTAkMuy9VNyH1z1o',
       authDomain: 'clasificate-c2664.firebaseapp.com',
       databaseURL: 'https://clasificate-c2664.firebaseio.com',
       projectId: 'clasificate-c2664',
       storageBucket: 'clasificate-c2664.appspot.com',
       messagingSenderId: '1050337382412'
     };
 
     private formModiTel: FormGroup;
     private deshabilitarEnviarCod: Boolean = true;
 
     private estadoFormulario: Boolean = false;
 
     private usuario: Usuario = new Usuario();
     private usuarioValidador: any;
 
     private erroresFormulario = {
       'numero_telefono': '',
       'codigo_validacion': '',
     };
 
     private mensajesValidacion = {
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
 
     }
 
 
     validarRepeticionValor(nombreControl: string): ValidatorFn {
       return (control: AbstractControl): {[key: string]: any} => {
         const claveAnterior: string = this.formModiTel.get(nombreControl).value;
         const diferentes: Boolean = claveAnterior !== control.value;
         return diferentes ? {'noigual': {value: control.value}} : null;
       };
     }
 
     private construyeFormulario(): void {
 
       this.formModiTel = this.fb.group({
         'numero_telefono': ['', [Validators.required, Validators.minLength(10),
                   Validators.maxLength(10), Validators.pattern(/^\d{10}/)] ],
         'codigo_validacion': ['', [Validators.required] ]
       });
 
       this.formModiTel.valueChanges.subscribe(data => this.alCambiarValor(data));
 
     }
 
     alCambiarValor(data?: any) {
       if (!this.formModiTel) { return; }
       const formulario: FormGroup = this.formModiTel;
 
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
       if (this.formModiTel.status === 'VALID') {
         this.estadoFormulario = true;
       }
 
       this.deshabilitarEnviarCod = true;
       const validacion: Boolean = (this.formModiTel.get('numero_telefono').valid) && (this.windowRef.recaptchaVerifier);
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
       const num = '+58' + this.formModiTel.get('numero_telefono').value;
 
       firebase.auth().signInWithPhoneNumber(num, appVerifier).
       then(result => { this.windowRef.confirmationResult = result; }).
       catch(error => console.log(error));
     }
 
     onSubmit() {
 
       const codigo: string = this.formModiTel.get('codigo_validacion').value;
       this.windowRef.confirmationResult.confirm(codigo).
       then( result => this.alValidar(result.user) ).
       catch( error => alert(error + ' Código incorrecto.') );
 
     }
 
     private alValidar(resultado: any) {
 
      const formulario = this.formModiTel.value;
 
      const usuarioValidado: Usuario = this.datosUsuario.obtenerUsuarioLogueadoPlano();

      usuarioValidado.telefono = formulario.numero_telefono as string;
 
       // this.datosUsuario.usuarioCompartido = usuarioValidado;
      

      'Llamar instrucción para modificar telefono'
      this.datosUsuario.modificarUsuario(usuarioValidado).
      subscribe( usuario => this.datosUsuario.login(usuario.correo, usuario.contrasenia), error => alert(error) );
      alert('Modificar el teléfono');

     }
 
     revert(): void {
       this.router.navigate(['/clasificados']);
     }
 
 


}
