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
          return results;
        }), catchError((error: HttpErrorResponse)=>{
          throw new Error(error.error.message);
        })
      )
  }

  cerrarSesion(){
    localStorage.clear();
  }

}
