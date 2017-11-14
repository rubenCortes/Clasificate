import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Mensaje, RespuestaFiltro } from '../servicios';


@Injectable()
export class MensajeService {

  datosMensaje = 'http://192.168.10.80:8080/Clasificate/recursos/mensaje/';

      constructor( private http: HttpClient) { }

      getMensaje(id: number): Observable<Mensaje> {
        return this.http.get<Mensaje>(this.datosMensaje + id);
      }

      getMensajes(): Observable<Mensaje[]> {
        return this.http.get<Mensaje[]>(this.datosMensaje);
      }

      getMensajesPorUsuario(id: number): Observable<Mensaje[]> {
        return this.http.get<Mensaje[]>(this.datosMensaje + 'usuario/' + id);
      }

      getMensajesPorSubCategoria(id: number): Observable<Mensaje[]> {
        return this.http.get<Mensaje[]>(this.datosMensaje + 'subcategoria/' + id);
      }

      getMensajesFiltrados(dat: RespuestaFiltro ): Observable<Mensaje[]> {
        const parametros: string[] = [];

        if (dat.idCategoria) {
          parametros.push('cat=' + dat.idCategoria);
        }
        if (dat.idSubCategoria) {
          parametros.push('sub=' + dat.idSubCategoria);
        }
        if (dat.idEstadoRegion) {
          parametros.push('est=' + dat.idEstadoRegion);
        }
        if (dat.idPoblacion) {
          parametros.push('pob=' + dat.idPoblacion);
        }
        if (dat.cancelar) {
          parametros.push('can=' + dat.cancelar);
        }

        const filtro = parametros.join('&');

        return this.http.get<Mensaje[]>(this.datosMensaje + 'filtro?' + filtro);
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
