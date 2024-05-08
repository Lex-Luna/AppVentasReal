import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../Models/respuesta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAuthService } from '../services/api-auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  url: string = "https://localhost:7159/api/login";
  // Aqui esta el constructor xsi no lo ves
  constructor(public apiAuthService: ApiAuthService,
    private router: Router) {
    /* if (this.apiAuthService.usuarioData) {
      this.router.navigate(["/"]);
    } */
  }
  login() {
    try {
      console.log(this.loginForm.value)
      this.apiAuthService.login(this.loginForm.value).subscribe(Respuesta => {
        if (Respuesta.exito === 1) {
          this.router.navigate(["/"]);
        }
      })
    } catch (error) {
      console.log("Error en usuario o contraseña");
    }

  }
  /* login(email: string, password: string): Observable<Respuesta> {
    return this._http.post<Respuesta>(this.url, { email, password }, httpOption);
  } */
  ngOnInit(): void {

  }

}
