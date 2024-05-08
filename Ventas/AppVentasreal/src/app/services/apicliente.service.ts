import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../Models/respuesta';
import { Cliente } from '../Models/cliente';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string = "https://localhost:7159/api/cliente";
  constructor(private _http: HttpClient) {

  }
  getClientes(): Observable<Respuesta> {
    return this._http.get<Respuesta>(this.url);

  }
  add(cliente: Cliente): Observable<Respuesta> {

    return this._http.post<Respuesta>(this.url, cliente, httpOption);

  }
  edit(cliente: Cliente): Observable<Respuesta> {

    return this._http.put<Respuesta>(this.url, cliente, httpOption);

  }

  delete(id: number): Observable<Respuesta> {

    return this._http.delete<Respuesta>(`${this.url}/${id}`);

  }

}
