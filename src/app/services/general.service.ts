import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from './endpoints';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:HttpClient){ }

  getMenu(){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(endpoints.catalogo.menu, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getDepartamentos(){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(endpoints.catalogo.departamentos, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getMunicipios(id_departamento:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(endpoints.catalogo.municipios + '/' + id_departamento, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

}
