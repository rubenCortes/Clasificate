import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono'
})
export class TelefonoPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let numeroFormateado = value.substr(8, 2);
    numeroFormateado = value.substr(6, 2) + '.' + numeroFormateado;
    numeroFormateado = value.substr(3, 3) + '.' + numeroFormateado;
    numeroFormateado = value.substr(0, 3) + '-' + numeroFormateado;
    numeroFormateado = '0' + numeroFormateado;
    return numeroFormateado;
  }

}
