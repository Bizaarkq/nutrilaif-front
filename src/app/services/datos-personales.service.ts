import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

  constructor(
    private http:HttpClient
  ) {}

  getDatosPersonales(id = null){
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
