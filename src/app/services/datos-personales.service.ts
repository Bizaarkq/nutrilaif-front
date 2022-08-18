import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { map, Observable } from 'rxjs';
import { UrlTree } from '@angular/router';
//import { url } from 'inspector';
@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

  constructor(
    private http:HttpClient
  ) {}

  getDatosPersonales(id:any = null){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    let url = id === '' || id === null ? endpoints.paciente.listaPacientes : endpoints.paciente.listaPacientes + '/' + id;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getDatos(id:string){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    let url = id === '' || id === null ? endpoints.paciente.getExpediente : endpoints.paciente.getExpediente + '/' + id;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  update( dto:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    //let url = id === '' || id === null ? endpoints.paciente.editarPaciente : endpoints.paciente.editarPaciente + '/' + id;
    return this.http.post(endpoints.paciente.editarPaciente, dto,{headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  deletePaciente(id: string){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    let url = endpoints.paciente.eliminarPaciente + '/' + id;
    return this.http.delete(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }
}
