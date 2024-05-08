import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../services/api-auth.service';
import { Respuesta } from '../Models/respuesta';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  //public email: string;
  public pasword: string;
  constructor(public apiAuth: ApiAuthService) { }

  ngOnInit(): void {
    this.apiAuth.login(this.loginForm.value).subscribe(Respuesta => {

      console.log(Respuesta);
    });

  }

}
