import { Component } from '@angular/core';
import { User } from './Models/usuario';
import { ApiAuthService } from './services/api-auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //VARIABLES

  title = 'AppVentasreal';
  usuario: User;
  //CONSTRUCTOR
  constructor(public apiAuthService: ApiAuthService,
    private ruter: Router
  ) {
    this.apiAuthService.usuario.subscribe(res => {
      this.usuario = res;
      console.log("Cambio el objeto: " + res);
    })
  }
  //FUNCIONES
  logout() {
    this.apiAuthService.logout();
    this.ruter.navigate(["/login"]);
  }
}


