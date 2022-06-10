import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from './endpoints';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(
    private http:HttpClient
  ) {}

  guardarConsulta(cuerpo: any, id: string = ''){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    let url = id === '' ? endpoints.consulta.guardarConsulta : endpoints.consulta.guardarConsulta + '/' + id;
    return this.http.post(url , cuerpo, {headers})
    .pipe(
      map((results: any) => {
        console.log(results);
        return results;
      })
    );

  }
}
