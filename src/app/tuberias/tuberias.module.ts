import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonoPipe } from './telefono.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TelefonoPipe],
  exports : [TelefonoPipe]
})
export class TuberiasModule { }
