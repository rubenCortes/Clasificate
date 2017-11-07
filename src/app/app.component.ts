import { Component } from '@angular/core';

import { ANIMACION_MENU } from './servicios';
import { Usuario } from './servicios';
import { UsuarioService } from './core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ ANIMACION_MENU ]
})
export class AppComponent {
  private title = 'Clasificate';
  private usuarioLogueado: Observable<Usuario>;
  private subMenuUsuario = false;

  constructor(  private autenticar: UsuarioService  ) {
    this.usuarioLogueado = this.autenticar.obtenerUsuarioLogueado();
  }

  private mostrarSubMenu(estado?: number) {
    if (estado) {
      this.subMenuUsuario = false;
    } else {
      this.subMenuUsuario = this.subMenuUsuario ? false : true;
    }
  }

}
