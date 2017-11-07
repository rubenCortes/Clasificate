import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Mensaje } from '../servicios';


@Injectable()
export class MensajeService {

  datosMensaje = 'http://192.168.10.80:8080/Clasificate/recursos/mensaje/';

      constructor( private http: HttpClient) { }

      getMensaje(id: number): Observable<Mensaje> {
        return this.http.get<Mensaje>(this.datosMensaje + id);
      }

      getMensajesPorUsuario(id: number): Observable<Mensaje[]> {
        return this.http.get<Mensaje[]>(this.datosMensaje + 'usuario/' + id);
      }

      agregarMensaje(mensaje: Mensaje): Observable<string> {
        const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(mensaje);
        return this.http.post<string>(this.datosMensaje, body, {headers: cabecera});
      }

      borrarMensaje(id: number): Observable<string> {
        return this.http.delete<string>(this.datosMensaje + id);
      }


}
