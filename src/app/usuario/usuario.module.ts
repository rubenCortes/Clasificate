import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialPersonalizadoModule } from '../material-personalizado/material-personalizado.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FormularioDatosComponent } from './formulario-datos/formulario-datos.component';
import { FormulariValidacionComponent } from './formulari-validacion/formulari-validacion.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ModificarClaveComponent } from './modificar-clave/modificar-clave.component';
import { ModificarDatosComponent } from './modificar-datos/modificar-datos.component';
import { ModificarTelefonoComponent } from './modificar-telefono/modificar-telefono.component';
import { RegistroDatosComponent } from './registro-datos/registro-datos.component';
import { ValidarDatosComponent } from './validar-datos/validar-datos.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialPersonalizadoModule,
    UsuarioRoutingModule
  ],
  declarations: [
    FormularioDatosComponent,
    FormulariValidacionComponent,
    LogInComponent,
    LogOutComponent,
    ModificarClaveComponent,
    ModificarDatosComponent,
    ModificarTelefonoComponent,
    RegistroDatosComponent,
    ValidarDatosComponent
  ]
})
export class UsuarioModule { }
