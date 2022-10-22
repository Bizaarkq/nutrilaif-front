import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { endpoints } from './endpoints';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  iniciarSesion(user: string, pass: string) {
    const headers = new HttpHeaders({
      'content-Type': 'application/x-www-form-urlencoded',
    });

    const loginForm = new HttpParams({
      fromObject: {
        username: user,
        password: pass,
        grant_type: 'password',
        client_id: environment.client,
        client_secret: environment.clientSecret
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

  getUserInfo(){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    return this.http
      .post(endpoints.auth.infoUser, null, { headers })
      .pipe(
        map((results: any) => {
          localStorage.setItem('rol', results.rol);
          return results;
        }), catchError((error: HttpErrorResponse)=>{
          throw new Error(error.error.message);
        })
      )
  }

  cerrarSesion(){
    const headers = new HttpHeaders({
      'content-Type': 'application/x-www-form-urlencoded',
    });

    const formSesion = new HttpParams({
      fromObject: {
        client_id: environment.client,
        client_secret: environment.clientSecret,
        refresh_token: localStorage.getItem('refresh_token') ?? ''
      },
    });
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_expires_in');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    localStorage.removeItem('nombre');

    return this.http
      .post(endpoints.auth.logout, formSesion, { headers })
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
        client_id: environment.client,
        client_secret: environment.clientSecret,
        refresh_token: localStorage.getItem('refresh_token') ?? ''
      },
    });

    return this.http
      .post(endpoints.auth.login, formSesion, { headers })
      .pipe(
        map((results: any) => {
          return results;
        })
      );
  }

}
