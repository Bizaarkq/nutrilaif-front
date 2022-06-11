import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  constructor(private http:HttpClient ) { }

  //Obtener expedientes 
  getExpedientes(){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    let url = endpoints.expediente.listaExpedientes;
    return this.http.get(url, {headers}).pipe(
      map((results: any)=>{
        return results;
      })
    )
  }
}
