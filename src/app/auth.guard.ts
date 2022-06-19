import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.authService.getUserInfo().subscribe(
      {
        next: res=>{
          localStorage.setItem('nombre', res.name);
          localStorage.setItem('user', res.preferred_username);
        },
        error: error =>{
          this.redirect(true);
        }
      });
    return true;      
  }
  
}
