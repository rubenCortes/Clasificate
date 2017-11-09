import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { Mensaje } from '../../servicios';
import { MensajeService, UsuarioService  } from '../../core';

import { PublicarDialogoComponent } from '../publicar-dialogo/publicar-dialogo.component';

@Component({
  selector: 'app-mis-clasificados',
  templateUrl: './mis-clasificados.component.html',
  styleUrls: ['./mis-clasificados.component.css']
})
export class MisClasificadosComponent implements OnInit {

  mensajes: Mensaje[];
  mensajes$: Observable<Mensaje[]>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private mensajeDatos: MensajeService,
    private usuarioDatos: UsuarioService ) { }

  ngOnInit() {
    if (this.usuarioDatos.estaLogueado) {
      this.actualizarMensajes();
    } else {
      alert('Debe de loguearse para accesar a esta página');
      this.usuarioDatos.urlDestino = '/misclasificados';
      this.router.navigate(['/login']);
    }
  }

  private publicarClasificado(): void {
    const dialogRef = this.dialog.
    open(PublicarDialogoComponent);

    dialogRef.afterClosed().subscribe(() => {
      const idUsuarioLogueado = this.usuarioDatos.obtenerUsuarioLogueadoPlano().idUsuario;
      alert(`Id Usuario Logueado: ${idUsuarioLogueado}`);
      this.actualizarMensajes();
    });
  }

  actualizarMensajes(): void {
    this.mensajes$ = this.mensajeDatos.
    getMensajesPorUsuario(this.usuarioDatos.obtenerUsuarioLogueadoPlano().idUsuario);
  }


}

