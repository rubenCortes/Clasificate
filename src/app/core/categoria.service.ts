import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Categoria } from '../servicios';

@Injectable()
export class CategoriaService {

  private datosCategoria = 'http://192.168.10.80:8080/Clasificate/recursos/categoria/simple';

      constructor( private http: HttpClient ) { }

      getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.datosCategoria);
      }


      getCategoria(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(this.datosCategoria + id);
      }

}
