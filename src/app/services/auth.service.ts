import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { endpoints } from './endpoints';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfoCache: any = null;
  constructor(private http: HttpClient) {}

  iniciarSesion(user: string, pass: string) {
    const headers = new HttpHeaders({
      'content-Type': 'application/x-www-form-urlencoded',
    });

    const loginForm = new HttpParams({
      fromObject: {
        codigo: user,
        password: pass
      },
    });

    return this.http
      .post(endpoints.auth.login, loginForm, { headers })
      .pipe(
        map((results: any) => {
          return results;
        })
      );
  }

  getUserInfo(): Observable<any> {
    if (this.userInfoCache) {
      return of(this.userInfoCache);
    }

    let token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http
      .post(endpoints.auth.infoUser, null, { headers })
      .pipe(
        map((results: any) => {
          localStorage.setItem('nombre', results.name);
          localStorage.setItem('user', results.codigo);
          localStorage.setItem('roles', results.roles);
          this.userInfoCache = results;
          return results;
        }),
        catchError((error: HttpErrorResponse) => {
          // retornar error a subscribe
          return throwError(() => new Error('Error al obtener información del usuario'));
        })
      );
  }

  getRoles(): string[] {
    return this.userInfoCache?.roles ? this.userInfoCache.roles : (localStorage.getItem('roles') ?? '').split(',');
  }
  
  cerrarSesion(){
    let token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('roles');
    localStorage.removeItem('user');
    localStorage.removeItem('nombre');
    this.clearUserInfoCache();

    return this.http
      .post(endpoints.auth.logout, null, { headers })
      .pipe(
        map((results: any) => {
          return results;
        })
      );
  }

  extenderSesion(){
    //const tokenRefresh = localStorage.get
    const headers = new HttpHeaders({
      'content-Type': 'application/x-www-form-urlencoded',
    });

    const formSesion = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refresh_token') ?? ''
      },
    });

    return this.http
      .post(endpoints.auth.refresh, {}, { headers })
      .pipe(
        map((results: any) => {
          return results;
        })
      );
  }

  clearUserInfoCache() {
    this.userInfoCache = null;
  }
}
