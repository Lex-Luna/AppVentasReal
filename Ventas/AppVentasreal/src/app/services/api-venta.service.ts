import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venta } from '../Models/venta';
import { Observable } from 'rxjs';
import { Respuesta } from '../Models/respuesta';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiVentaService {
  url: string = "https://localhost:7159/api/Venta";
  constructor(
    private http: HttpClient
  ) { }
  add(venta: Venta): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.url, venta, httpOption)

  }
}
