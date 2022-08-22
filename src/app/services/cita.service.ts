import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from './endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http:HttpClient) { }

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

  doPostRequest(url: string, cuerpo: any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(url , cuerpo, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getCitas(){
    let url = endpoints.cita.listado;
    return this.doGetRequest(url);
  }

  guardarCita(cita:any){
    let url = endpoints.cita.guardar;
    return this.doPostRequest(url, cita);
  }

  updateCita(cita:any){
    let url = endpoints.cita.updateFechaHora;
    return this.doPostRequest(url, cita);
  }

  eliminarCita(id:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    let url = endpoints.cita.eliminar + '/' + id;
    return this.http.delete(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

}
