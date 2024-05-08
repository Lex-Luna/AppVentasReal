import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiAuthService } from '../services/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //aqui esta el constructor x si no lo ves
  constructor(private _router: Router, private apiAuthService: ApiAuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    //si no tienes una secion iniciada te enviara al login  
    const usuario = this.apiAuthService.usuarioData;
    if (usuario) {
      return true;
    }
    this._router.navigate(["/login"]);
    return false;
  }

}
