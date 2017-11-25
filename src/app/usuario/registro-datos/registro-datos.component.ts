import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UsuarioService } from '../../core';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.component.html',
  styleUrls: ['./registro-datos.component.css']
})
export class RegistroDatosComponent implements OnInit {

  constructor(private usuario: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  private botonAceptar() {
    
    alert('Nombre de usuario a registrar: ' + this.usuario.usuarioCompartido.nombre);

    this.usuario.agregarUsuario(this.usuario.usuarioCompartido).
    subscribe(respuesta => this.procesarAceptar(respuesta) , error => alert('Se genero un error: ' + error));
  }
    
  private procesarAceptar( dato ): void {
    alert('Usuario agregado: ' + dato.text());
    this.usuario.login(this.usuario.usuarioCompartido.correo, this.usuario.usuarioCompartido.contrasenia);
    this.router.navigate(['/clasificados']);
  }

}
