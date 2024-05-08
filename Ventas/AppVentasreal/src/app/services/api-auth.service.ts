import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Respuesta } from '../Models/respuesta';
import { User } from '../Models/usuario';
import { Login } from '../Models/login';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  url: string = "https://localhost:7159/api/User/login";

  private _usuarioSubject: BehaviorSubject<User>;
  public get usuarioData(): User {
    return this._usuarioSubject.value;
  }

  //Aqui esta el constructor xcsi no lo ves 
  constructor(private _http: HttpClient) {
    this._usuarioSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("usuario")));
  }

  login(login: Login): Observable<Respuesta> {
    return this._http.post<Respuesta>(this.url, login, httpOption).pipe(
      map(res => {
        if (res.exito === 1) {
          const user: User = res.data;
          localStorage.setItem("usuario", JSON.stringify(user));
          this._usuarioSubject.next(user);
        }
        return res;
      })
    );
  }
  logout() {
    localStorage.removeItem("usuario");
    this._usuarioSubject.next(null);
  }

}
