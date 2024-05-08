import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { ApiAuthService } from '../services/api-auth.service';
import { Respuesta } from '../Models/respuesta';
import { Injectable } from "@angular/core";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // aqui esta el constructor xsi no lo ves
    constructor(private apiAuthService: ApiAuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //throw new Error("Method not implemented.");
        const usuario = this.apiAuthService.usuarioData;
        if (usuario) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            })
        }
        return next.handle(req);
    }

}