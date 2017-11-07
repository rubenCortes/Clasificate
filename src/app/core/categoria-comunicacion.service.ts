import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoriaComunicacionService {

  // Observable string sources
  private subCategoriaSeleccionada = new Subject<number>();

     // Observable string streams
     subCategoria = this.subCategoriaSeleccionada.asObservable();

     constructor() { }

     // Service message commands
     subCategoriaComponente(subCategoria: number) {
       this.subCategoriaSeleccionada.next(subCategoria);
     }

}
