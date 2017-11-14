import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Pais } from '../servicios';

@Injectable()
export class PaisService {
  private datosPais = 'http://192.168.10.80:8080/Clasificate/recursos/pais/';

    constructor( private http: HttpClient ) { }

    getPaises(): Observable<Pais[]> {
      return this.http.get<Pais[]>(this.datosPais);
    }

    getPais(id: number): Observable<Pais> {
      return this.http.get<Pais>(this.datosPais + id);
    }

    getPaisPorNombre(nombre: string, idCat = 0, idSubCat = 0): Observable<Pais> {
      return this.http.get<Pais>(this.datosPais + 'nombre/' + nombre + '?' + 'cat=' + idCat + '&subcat=' + idSubCat);
    }

}
