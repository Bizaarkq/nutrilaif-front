import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthService){}
  
  redirect(bandera: any){
    if(bandera){
      this.router.navigate(['auth/login']);
    }
  }

  redirectToIndex(){
    this.router.navigate(['inicio']);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.getUserInfo().pipe(
      map((results: any) => {
        let roles = results.roles;
        // verificando si uno el rol/roles del usuario están en la data de la ruta
        // siendo roles un arreglo de roles del usuario
        if(route.data['roles']){
          let got_roles = route.data['roles'].reduce((acc: boolean, role: String[]) => {
            return acc || roles.includes(role);
          }, false);
          if(!got_roles) this.redirectToIndex();
          return got_roles;
        }
        return true;
      }),
      catchError(() => {
        this.redirect(true);
        return of(false);
      })
    );    
  }
  
}