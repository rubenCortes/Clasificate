import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private mensajeDatos: MensajeService,
    private usuarioDatos: UsuarioService ) { }

  ngOnInit() {
    if (this.usuarioDatos.estaLogueado) {
      this.mensajeDatos.
      getMensajesPorUsuario(this.usuarioDatos.obtenerUsuarioLogueadoPlano().idUsuario).
      subscribe(mensajes => this.mensajes = mensajes);
    } else {
      alert('Debe de loguearse para accesar a esta página');
      this.usuarioDatos.urlDestino = '/misclasificados';
      this.router.navigate(['/login']);
    }
  }

  private publicarClasificado(): void {
    const dialogRef = this.dialog.open(PublicarDialogoComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.mensajeDatos.
      getMensajesPorUsuario(this.usuarioDatos.obtenerUsuarioLogueadoPlano().idUsuario).
      subscribe(mensajes => this.mensajes = mensajes);
    });
  }
    // this.router.navigate(['/publicar']);

}

