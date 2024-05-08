import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../Models/respuesta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAuthService } from '../services/api-auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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


  //VARIABLE
  public loginForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  url: string = "https://localhost:7159/api/login";
  //CONSTRUCTOR
  constructor(public apiAuthService: ApiAuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    if (this.apiAuthService.usuarioData) {
      //this.router.navigate(["/"]);
    }
  }
  //FUNCIONES
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

  ngOnInit(): void {
    //nada que decir x aqui
  }

}
