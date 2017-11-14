import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { MisClasificadosComponent } from './mis-clasificados/mis-clasificados.component';
import { ClasificadoPublicarComponent } from './clasificado-publicar/clasificado-publicar.component';
import { ClasificadosComponent } from './clasificados/clasificados.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'misclasificados',
    component: MisClasificadosComponent
  },
  {
    path: 'publicar',
    component: ClasificadoPublicarComponent
  },
  {
    path: 'clasificados',
    component: ClasificadosComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasificadosRoutingModule { }
