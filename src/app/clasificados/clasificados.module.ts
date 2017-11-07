import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialPersonalizadoModule } from '../material-personalizado/material-personalizado.module';
import { ClasificadosRoutingModule } from './clasificados-routing.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClasificadoComponent } from './clasificado/clasificado.component';
import { ClasificadoDetalleComponent } from './clasificado-detalle/clasificado-detalle.component';
import { MisClasificadosComponent } from './mis-clasificados/mis-clasificados.component';
import { ClasificadoPublicarComponent } from './clasificado-publicar/clasificado-publicar.component';
import { PublicarDialogoComponent } from './publicar-dialogo/publicar-dialogo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialPersonalizadoModule,
    ClasificadosRoutingModule,
  ],
  declarations: [
    CategoriaComponent,
    ClasificadoComponent,
    ClasificadoDetalleComponent,
    MisClasificadosComponent,
    ClasificadoPublicarComponent,
    PublicarDialogoComponent
  ],
  entryComponents: [PublicarDialogoComponent]
})
export class ClasificadosModule { }
