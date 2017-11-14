import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Mensaje, RespuestaFiltro } from '../../servicios';
import { MensajeService } from '../../core';

@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.component.html',
  styleUrls: ['./clasificados.component.css']
})
export class ClasificadosComponent implements OnInit {

  mensajes$: Observable<Mensaje[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensajeDatos: MensajeService
  ) { }

  ngOnInit() {

    this.mensajes$ = this.mensajeDatos.getMensajes();
  //  this.mensajes$ = this.route.paramMap.
  //  switchMap( (parametro: ParamMap) => this.mensajeDatos.getMensajesPorSubCategoria(+parametro.get('idSubCategoria')) ) ;

  }
  procesaFiltro(ent: RespuestaFiltro): void {
    this.mensajes$ = this.mensajeDatos.getMensajesFiltrados(ent);
  }

}
