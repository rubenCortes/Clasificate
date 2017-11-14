import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

import { Categoria, SubCategoriaSimple, EstadoRegion, Poblacion, RespuestaFiltro } from '../../servicios';
import { CategoriaService, PaisService, PoblacionService } from '../../core';



@Component({
  selector: 'app-clasificado-filtro',
  templateUrl: './clasificado-filtro.component.html',
  styleUrls: ['./clasificado-filtro.component.css']
})
export class ClasificadoFiltroComponent implements OnInit {
  private nombrePais = 'VENEZUELA';
  private formularioFiltrar: FormGroup;
  private estadoFormulario: Boolean = false;
  @Output() resultado = new EventEmitter<RespuestaFiltro>();

  categorias$: Observable<Categoria[]>;
  subCategorias$: Observable<SubCategoriaSimple[]>;
  estados$: Observable<EstadoRegion[]>;
  poblaciones$: Observable<Poblacion[]>;

  constructor(  private datosPais: PaisService,
                private datosPoblacion: PoblacionService,
                private datosCategoria: CategoriaService,
                private fb: FormBuilder) {
    this.construyeFormulario();
  }

  private construyeFormulario(): void {

          this.formularioFiltrar = this.fb.group({
            'categoria': ['', [Validators.required] ],
            'subCategoria': ['', [Validators.required] ],
            'estado': ['', [Validators.required ] ],
            'poblacion': ['', [Validators.required ] ]
          });

         // this.formularioDatos.valueChanges.subscribe(data => this.alCambiarValor(data));
      }

  ngOnInit() {
    this.estados$ = this.datosPais.getPaisPorNombre(this.nombrePais).switchMap(miPais => this.ordenarEstados(miPais.estadoRegionList));
    this.categorias$ = this.datosCategoria.getCategorias().switchMap( categorias => this.ordenarCategorias(categorias) );
  }

  private llenarPoblaciones(): void {
    this.formularioFiltrar.get('poblacion').reset();
    const idEstado: number = this.formularioFiltrar.get('estado').value;
    this.estados$.subscribe(x => this.ordenarPoblaciones(x, idEstado));
  }

  private llenarSubCategorias(): void {
    this.formularioFiltrar.get('subCategoria').reset();
    const idCategoria: number = this.formularioFiltrar.get('categoria').value;

    this.categorias$.subscribe(x =>  this.ordernarSubCategorias(x, idCategoria));
    // Aplica filtro a los estados y poblaciones en base a las categirias y subcategorias seleccionadas
    this.estados$ = this.datosPais.getPaisPorNombre(this.nombrePais, idCategoria).
    switchMap(miPais => this.ordenarEstados(miPais.estadoRegionList));
  }

  private refrescarDatos(): void {
    const idSubCat: number = this.formularioFiltrar.get('subCategoria').value;
    this.estados$ = this.datosPais.getPaisPorNombre(this.nombrePais, 0, idSubCat).
    switchMap(miPais => this.ordenarEstados(miPais.estadoRegionList));
  }

  private ordenarCategorias( categoria: Categoria[] ): Observable<Categoria[]> {
    return Observable.of(
      categoria.sort( (a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        } else {
          return 0;
        }
      } )
    );
  }

  private ordernarSubCategorias( categorias: Categoria[], id: number ): void {
    const miSubCategoria = categorias.find(x => x.idCategoria === id).subCategoriaLista;
    this.subCategorias$ =  Observable.of(
      miSubCategoria.sort( (a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        } else {
          return 0;
        }
      } )
    );
  }

  private ordenarEstados(estados: EstadoRegion[]): Observable<EstadoRegion[]> {
    return Observable.of(
      estados.sort( (a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        } else {
          return 0;
        }
      } )
    );
  }

  private ordenarPoblaciones(estados: EstadoRegion[], id: number): void {
    const miPoblacion = estados.find(x => x.idEstadoRegion === id).poblacionList;
    this.poblaciones$ = Observable.of(
      miPoblacion.sort( (a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        } else {
          return 0;
        }
      } )
    );
  }

  onSubmit(): void {
    const formulario = this.formularioFiltrar.value;
    let datosFormulario = new RespuestaFiltro();
    datosFormulario = {
      idCategoria: formulario.categoria as number,
      idSubCategoria: formulario.subCategoria as number,
      idEstadoRegion: formulario.estado as number,
      idPoblacion: formulario.poblacion as number,
      cancelar: 0
    };
    this.resultado.emit(datosFormulario);
  }

  restablecer(): void {
    this.formularioFiltrar.reset();
    this.ngOnInit();
    let datosFormulario = new RespuestaFiltro();
    datosFormulario = {
      idCategoria: 0,
      idSubCategoria: 0,
      idEstadoRegion: 0,
      idPoblacion: 0,
      cancelar: 1
    };
    this.resultado.emit(datosFormulario);
  }

}
