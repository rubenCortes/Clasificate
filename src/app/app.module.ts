import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { MaterialPersonalizadoModule } from './material-personalizado/material-personalizado.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ClasificadosModule } from './clasificados/clasificados.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    UsuarioModule,
    ClasificadosModule,
    MaterialPersonalizadoModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
