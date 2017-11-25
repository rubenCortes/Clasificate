import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { CategoriaService } from './categoria.service';
import { CategoriaComunicacionService } from './categoria-comunicacion.service';
import { MensajeService } from './mensaje.service';
import { PaisService } from './pais.service';
import { PoblacionService } from './poblacion.service';
import { WindowService } from './window.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [],
  providers: [
    UsuarioService,
    CategoriaService,
    CategoriaComunicacionService,
    MensajeService,
    PaisService,
    PoblacionService,
    WindowService
  ]
})
export class CoreModule { }
