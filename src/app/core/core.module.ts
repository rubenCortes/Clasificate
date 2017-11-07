import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { CategoriaService } from './categoria.service';
import { CategoriaComunicacionService } from './categoria-comunicacion.service';
import { MensajeService } from './mensaje.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    UsuarioService,
    CategoriaService,
    CategoriaComunicacionService,
    MensajeService
  ]
})
export class CoreModule { }
