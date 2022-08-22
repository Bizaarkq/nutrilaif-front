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

  getPaises(){
    let token = localStorage.getItem("access_token");
    const headers=new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get(endpoints.catalogo.paises, {headers})
    .pipe(
      map((results:any)=>{
        return results;
      })
    );
  }

  getDepartamentos(cod_pais:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(endpoints.catalogo.departamentos + '/' + cod_pais, {headers})
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
  getBase(){
    let token = localStorage.getItem("access_token");
    const headers=new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get(endpoints.catalogo.listaBase, {headers})
    .pipe(
      map((results:any)=>{
        return results;
      })
    );
  }

  getEstados(codigo: any = null){
    let url = codigo ? endpoints.catalogo.estados + '/' + codigo : endpoints.catalogo.estados; 
    return this.doGetRequest(url);
  }

  getNutricionistas(){
    let url = endpoints.catalogo.nutricionistas;
    return this.doGetRequest(url);
  }

  doGetRequest(url: string){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }
}
