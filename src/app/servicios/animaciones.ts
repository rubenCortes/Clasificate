import { trigger, state, style, animate, transition } from '@angular/animations';
import { AnimationEntryMetadata } from '@angular/core';

export const ANIMACION_MENU: AnimationEntryMetadata = trigger('subMenuUsuario', [
    state('*', style({height: '*'})),
    transition('void => *', [style({height: 0 }), animate('200ms ease-in')]),
    transition('* => void',  animate('200ms ease-in',  style({height: 0})) ) ]);

export const ANIMACION_MENU_2: AnimationEntryMetadata = trigger('subMenuUsuario', [
    state('*', style({transform: 'translateY(0)'})),
    transition('void => *', [style({transform: 'translateY(-100%)' }), animate('200ms ease-in')]),
    transition('* => void',  animate('200ms ease-in',  style({transform: 'translateY(100%)' })) ) ]);
