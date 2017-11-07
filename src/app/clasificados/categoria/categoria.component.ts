import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';

import { Categoria } from '../../servicios';
import { CategoriaService, CategoriaComunicacionService } from '../../core';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private categorias: Categoria[] = [];
  private mensajeError: String;

  constructor(
    private categoriaComunicacion: CategoriaComunicacionService,
    private router: Router,
    private datos: CategoriaService ) { }

  ngOnInit() {
    this.actualizarLista();
  }

  actualizarLista(): void {
    const observador: Observer<Categoria[]> = {
      next: dato => this.categorias = dato,
      error: error => this.mensajeError = <any>error,
      complete: () => null
    };

    this.datos.getCategorias().subscribe(observador);
  }

  subCategoriaSeleccionada(subCategoria: number): void {
    // Al suscribirse en el componente appComponent se puede obtener
    // la lista de todos los estados y poblaciones en donde hayan
    // avisos de la subcategoria seleccionada
    this.categoriaComunicacion.subCategoriaComponente(subCategoria);
    // Rutear al componente mensaje-lista
    this.router.navigate(['/mensaje_lista', subCategoria ]);
  }


}
