import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class PlieguesService {

  constructor(
    private http:HttpClient
  ) { }

  //Guardar pliegues
  savePliegues(data:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(endpoints.pliegues.guardar, data, {headers}).pipe(
      map((results:any)=>{
        return results;
      })
    )
  }

  getPliegues( id:any = null ){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    let url = endpoints.pliegues.listar;
    return this.http.get(url, { headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    )
  }
}
