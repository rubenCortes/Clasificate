import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor( private usuarioDatos: UsuarioService, private router: Router ) { }

  ngOnInit() {
    this.usuarioDatos.logout();
    this.router.navigate(['/clasificados']);
  }

}
