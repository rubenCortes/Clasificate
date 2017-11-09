import { Component, OnInit, Input } from '@angular/core';

import { Mensaje } from '../../servicios';
@Component({
  selector: 'app-clasificado',
  templateUrl: './clasificado.component.html',
  styleUrls: ['./clasificado.component.css']
})
export class ClasificadoComponent implements OnInit {

  private titulo = 'Clasificado';
  private subtitulo = 'Gratis';
  private contenido = 'Vendo casa, buena, bonita y barara, ubicada en urbanización Lomas del Viento';

  @Input() mensaje: Mensaje;
  @Input() general: boolean;

  constructor() { }

  ngOnInit() {
  }

}
