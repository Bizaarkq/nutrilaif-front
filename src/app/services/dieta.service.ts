import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(
    private http:HttpClient
  ) { }

  guardarDieta( cuerpo:any, id: string = '' ){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    let url = endpoints.consulta.guardarConsulta + '/' + id;
    return this.http.post( url, cuerpo, {headers} )
    .pipe(
      map((results: any) => {
        return results;
      })
    )
  }
  
}
