import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

import { Usuario } from '../servicios';


@Injectable()
export class UsuarioService {

  public urlDestino: string;

  public estaLogueado = false;

  private usuarioLogueado = new Subject<Usuario>();

  private usuarioLog = new BehaviorSubject<Usuario>(new Usuario());

  public usuarioCompartido: Usuario;

  private datosUsuario = 'http://192.168.10.80:8080/Clasificate/recursos/usuario/';

  constructor( private http: HttpClient ) { }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.datosUsuario + id);
  }

  private getUsuarioValidado(correo: string, clave: string): Observable<Usuario> {
    return this.http
    .get<Usuario>(this.datosUsuario + 'validar/' + correo + '/' + clave);
  }

/*
  agregarUsuario(usuario: Usuario): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(usuario);
    console.log(body);
    return this.http.post(this.datosUsuario, body, options)
                    .map(this.extraerDatos)
                    .catch(this.handleError);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(usuario);
    return this.http.put(this.datosUsuario, body, options)
                    .map(this.extractDataSingle)
                    .catch(this.handleError);
  }

  borrarUusario(id: number): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.datosUsuario + id)
                    .map(this.extractDataSingle)
                    .catch(this.handleError);
  }
*/

  /*
  manejadorError(err: HttpErrorResponse | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = `Código: ${err.status}, Descripción: ${err.error.message}`;
    } else {
      console.log('Error no es response');
      errMsg = err.message ? err.message : err.toString();
    }
    console.error('Error al agregar: ' + errMsg);
    return Observable.throw(errMsg);
   }
*/


login(correo: string, clave: string): Observable<Usuario> {
    return this.getUsuarioValidado(correo, clave).do(sujeto => this.setUsuarioLogueado(sujeto));
  }

  private setUsuarioLogueado( miUsuario: Usuario): void {
    this.estaLogueado = true;
    this.usuarioLog.next(miUsuario);
    this.usuarioLogueado.next(miUsuario);
  }

  logout(): void {
    this.estaLogueado = false;
    this.usuarioLogueado.next();
    this.usuarioLog.next( new Usuario() );
  }

  obtenerUsuarioLogueado(): Observable<Usuario> {
   // return this.usuarioLogueado.asObservable();
    return this.usuarioLog.asObservable();
  }

  obtenerUsuarioLogueadoPlano(): Usuario {
    return this.usuarioLog.getValue();
  }

}
