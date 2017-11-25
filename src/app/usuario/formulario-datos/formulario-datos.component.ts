import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario, Pais, EstadoRegion, Poblacion } from '../../servicios';
import { PaisService } from '../../core';
import { PoblacionService } from '../../core';
import { UsuarioService } from '../../core';


@Component({
  selector: 'app-formulario-datos',
  templateUrl: './formulario-datos.component.html',
  styleUrls: ['./formulario-datos.component.css']
})
export class FormularioDatosComponent implements OnInit {

  @Input() anfitrion: string; // Anfitrión puede ser 'registrar' o 'modificar'
  
  @Output() aceptarPresionado = new EventEmitter();
  
  private nombreBotonAceptar: string;
  
  private formularioDatos: FormGroup;
  
    private estadoFormulario: Boolean = false;
  
    private usuario: Usuario = new Usuario();
  
    // Buscar el pais en la base de datos con el método creado
  
    private estadoLista: EstadoRegion[] = [];
  
    private poblacionLista: Poblacion[] = [];
  
    private erroresFormulario = {
      'nombre': '',
      'apellido': '',
      'estado': '',
      'poblacion': ''
    };
  
    private mensajesValidacion = {
      'nombre': {
        'required': 'Debe escribir su nombre.'
      },
      'apellido': {
        'required': 'Debe escribir su apellido.'
      },
      'estado': {
        'required': 'Seleccione su estado.'
      },
      'poblacion': {
        'required': 'Seleccione la población.'
      }
    };
  
    constructor(  private fb: FormBuilder,
                  private datosPais: PaisService,
                  private datosPoblacion: PoblacionService,
                  private datosUsuario: UsuarioService,
                  private router: Router) {
        this.construyeFormulario();
       }
  
    private construyeFormulario(): void {
  
        this.formularioDatos = this.fb.group({
          'nombre': ['', [Validators.required] ],
          'apellido': ['', [Validators.required] ],
          'estado': ['', [Validators.required ] ],
          'poblacion': ['', [Validators.required ] ]
        });
  
        this.formularioDatos.valueChanges.subscribe(data => this.alCambiarValor(data));
    }
  
    alCambiarValor(data?: any) {
      if (!this.formularioDatos) { return; }
      const formulario: FormGroup = this.formularioDatos;
  
      for (const campo in this.erroresFormulario) {
        if ( campo in this.erroresFormulario ) {
          const control: AbstractControl = formulario.get(campo);
          this.erroresFormulario[campo] = '';
          if (control && control.dirty && !control.valid) {
            const mensajes = this.mensajesValidacion[campo];
            for (const error in control.errors) {
              if (error in control.errors) {
                this.erroresFormulario[campo] += mensajes[error] + ' ';
              }
            }
          }
        }
  
      }
  
      this.estadoFormulario = false;
      if (this.formularioDatos.status === 'VALID') {
          this.estadoFormulario = true;
      }
    }
  
    revert(): void {
      this.router.navigate(['/clasificados']);
    }
  
    onSubmit(): void {
      alert('Agregar usuario a la base de datos ...');
      const formulario = this.formularioDatos.value;
  
      this.datosUsuario.usuarioCompartido.nombre = (formulario.nombre as string).toUpperCase();
      this.datosUsuario.usuarioCompartido.apellido = (formulario.apellido as string).toUpperCase();
      const poblacionSeleccionada = this.poblacionLista.
      find( poblacion => poblacion.idPoblacion === formulario.poblacion as number);
      alert(poblacionSeleccionada.idPoblacion + ' ' + poblacionSeleccionada.nombre);
      this.datosUsuario.usuarioCompartido.poblacion = poblacionSeleccionada;
      this.aceptarPresionado.emit();
    }
  
    ngOnInit() {
      this.nombreBotonAceptar = (this.anfitrion === 'registrar') ? 'Registrar' : 'Modificar';
  
      const nombrePais = 'VENEZUELA';
  
      this.datosPais.getPaisPorNombre(nombrePais).
      subscribe(resultado => this.estadoLista = resultado.estadoRegionList.sort( (a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        } else {
          return 0;
        }
      } ) );
    }
  
    llenarListaPoblacion(): void {
  
      const idEstado: number = this.formularioDatos.get('estado').value;
  
      this.datosPoblacion.getPoblacionesEstado(idEstado).
            subscribe(resultado => this.poblacionLista = resultado.sort( (a, b) => {
                    if (a.nombre < b.nombre) {
                      return -1;
                    } else if (a.nombre > b.nombre) {
                      return 1;
                    } else {
                      return 0;
                    }
              } ));
  
    }
  
}
