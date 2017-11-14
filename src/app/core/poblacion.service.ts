import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Poblacion } from '../servicios';

@Injectable()
export class PoblacionService {
  private urlPoblacion = 'http://192.168.10.80:8080/Clasificate/recursos/poblacion/';

  constructor( private http: HttpClient ) { }


  getPoblaciones(): Observable<Poblacion[]> {
    return this.http.get<Poblacion[]>(this.urlPoblacion);
  }

  getPoblacionesEstado(id: number): Observable<Poblacion[]> {
    return this.http.get<Poblacion[]>(this.urlPoblacion + 'estado/' + id);

  }

}
