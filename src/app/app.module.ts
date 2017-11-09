import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEsVe from '@angular/common/locales/es-VE';
import localeEsVeExtra from '@angular/common/locales/extra/es-VE';

registerLocaleData(localeEsVe, localeEsVeExtra);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TuberiasModule } from './tuberias/tuberias.module';
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
    TuberiasModule,
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
