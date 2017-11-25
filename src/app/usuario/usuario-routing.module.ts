import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { UsuarioRaizComponent } from './usuario-raiz/usuario-raiz.component';
import { ValidarDatosComponent } from './validar-datos/validar-datos.component';
import { RegistroDatosComponent } from './registro-datos/registro-datos.component';
import { ModificarTelefonoComponent } from './modificar-telefono/modificar-telefono.component';
import { ModificarClaveComponent } from './modificar-clave/modificar-clave.component';

import { ModificarDatosComponent } from './modificar-datos/modificar-datos.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'logout',
    component: LogOutComponent
  },
  {
    path: 'usuario',
    component: UsuarioRaizComponent,
    children: [
      {
        path: 'validar',
        component: ValidarDatosComponent
      },
      {
        path: 'registrar',
        component: RegistroDatosComponent
      },
      {
        path: '',
        children: [
          {
            path: 'modi-tel',
            component: ModificarTelefonoComponent
          },
          {
            path: 'modi-clave',
            component: ModificarClaveComponent
          },
          {
            path: 'modi-datos',
            component: ModificarDatosComponent
          }
        ]
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
