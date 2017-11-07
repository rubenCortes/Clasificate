import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Categoria, SubCategoriaSimple, Mensaje, Usuario } from '../../servicios';
import { CategoriaService, MensajeService, UsuarioService } from '../../core';

@Component({
  selector: 'app-clasificado-publicar',
  templateUrl: './clasificado-publicar.component.html',
  styleUrls: ['./clasificado-publicar.component.css']
})
export class ClasificadoPublicarComponent implements OnInit {

  private usuarioLogueado: Observable<Usuario>;
  private formularioPublicar: FormGroup;
  private estadoFormulario: Boolean = false;

  // Buscar el pais en la base de datos con el método creado
  private mensaje: Mensaje = new Mensaje();
  private categorias: Categoria[] = [];
  private subCategorias: SubCategoriaSimple[] = [];

  private erroresFormulario = {
    'mensaje': '',
    'categoria': '',
    'subCategoria': ''
  };

  private mensajesValidacion = {
    'mensaje': {
      'required': 'Debe escribir su mensaje.'
    },
    'categoria': {
      'required': 'Seleccione la categoría.'
    },
    'subCategoria': {
      'required': 'Seleccione la sub categoria.'
    }
  };

  constructor(  private fb: FormBuilder,
                private datosCategoria: CategoriaService,
                private usuario: UsuarioService,
                private mensajeDatos: MensajeService,
                private router: Router) {
      this.construyeFormulario();
       }

  private construyeFormulario(): void {

      this.formularioPublicar = this.fb.group({
        'categoria': ['', [Validators.required] ],
        'subCategoria': ['', [Validators.required] ],
        'mensaje': ['', [Validators.required ] ]
      });
      this.formularioPublicar.valueChanges.subscribe(data => this.alCambiarValor(data));
  }

  alCambiarValor(data?: any) {
    if (!this.formularioPublicar) { return; }
    const formulario: FormGroup = this.formularioPublicar;

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
    if (this.formularioPublicar.status === 'VALID') {
        this.estadoFormulario = true;
    }
  }

  revert(): void {
    // this.router.navigate(['/categoria']);
   // const subcate = this.subCategorias[0] ;
   // alert(subcate.idSubCategoria);
  }

  onSubmit(): void {
    if (this.usuario.estaLogueado) {
      alert('Activo esta logueado');
      const miMensaje = new Mensaje();
      miMensaje.usuario = new Usuario();
      miMensaje.subCategoria = new SubCategoriaSimple();

      const formulario = this.formularioPublicar.value;
      alert('Antes de la suscripción');
      this.usuarioLogueado.
      subscribe(usuario =>  miMensaje.usuario.idUsuario = usuario.idUsuario );
      alert('IdUsuario ' + miMensaje.usuario.idUsuario);

      miMensaje.subCategoria.idSubCategoria = formulario.subCategoria as number;
      miMensaje.contenido = (formulario.mensaje as string).toUpperCase();

      const mensaje = miMensaje.contenido;
      const subCategoria = miMensaje.subCategoria.idSubCategoria;
      const idUsuario = miMensaje.usuario.idUsuario;
      this.mensajeDatos.agregarMensaje(miMensaje)
      .subscribe(respuesta => alert(respuesta), error => alert(error));
      this.router.navigate(['/misclasificados']);

      /*
      this.datosUsuario.usuarioCompartido.nombre = (formulario.nombre as string).toUpperCase();
      this.datosUsuario.usuarioCompartido.apellido = (formulario.apellido as string).toUpperCase();
      const poblacionSeleccionada = this.poblacionLista.
      find( poblacion => poblacion.idPoblacion === formulario.poblacion as number);
      alert(poblacionSeleccionada.idPoblacion + ' ' + poblacionSeleccionada.nombre);
      this.datosUsuario.usuarioCompartido.poblacion = poblacionSeleccionada;
      this.aceptarPresionado.emit();
*/
    } else {
      alert('Debe de loguearse para poder registrar un mensaje');
      this.usuario.urlDestino = '/publicar';
      this.router.navigate(['/login']);

    }

  }

  ngOnInit() {
    this.usuarioLogueado = this.usuario.obtenerUsuarioLogueado();
    // this.usuarioLogueado = this.usuario.obtenerUsuarioLogueado();

    this.actualizarLista();
  }

  actualizarLista(): void {
    this.datosCategoria.getCategorias().
    subscribe(lista => this.procesaCategoria(lista));
  }

  private procesaCategoria(lista: Categoria[]): void {
    console.log('Inicio');
    this.categorias = lista.
    filter(x => x.subCategoriaLista.length > 0).
    sort( (a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    } );


    // lista.forEach(x => listaProcesada.push( x ));

    console.log('Procesamiento de Categorias');
    console.log( this.categorias[2].nombre );
    console.log( this.categorias[2].subCategoriaLista[0].nombre );
  }

  llenarSubCategorias(): void {
    const idCategoria: number = this.formularioPublicar.get('categoria').value;
    this.subCategorias.length = 0;
    this.subCategorias = this.categorias.
    find(t => t.idCategoria === idCategoria ).
    subCategoriaLista.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      } else if (a.nombre > b.nombre) {
        return 1;
      } else {
        return 0;
      }
    });

  }


}
