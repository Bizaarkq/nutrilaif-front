import { Injectable } from '@angular/core';
//import { Alimentos } from '../views/components/listar-alimentos/listar-alimentos.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlimentosService {
  constructor(private http:HttpClient) { }
  
  //Obtener alimentos
  getAlimentos(llave:string = ''){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
  //Validacion 
    let url = llave==='' || llave === null? endpoints.alimento.listaAlimentos:endpoints.alimento.listaAlimentos + '/' + llave; 
    return this.http.get(url, {headers}).pipe(
      map((results: any) => {
        return results;
      })
    );
  }
  //Agregar alimentos
  addAlimentos(data:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    return this.http.post(endpoints.alimento.agregarAlimentos, data, {headers}).pipe(
      map((results: any) => {
        return results;
      })
    )
  }
  //Editar alimentos
  editarAlimentos(data:any){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post(endpoints.alimento.editarAlimentos, data, {headers}).pipe(
      map((results: any) => {
        return results;
      })
    )
  }
  
  //Elimminar un alimento 
  eliminarAlimento(id:number){
    let token = localStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    return this.http.post(endpoints.alimento.elimarAlimentos, id, {headers}).pipe(
      map((results: any) => {
        return results;
      })
    )
  }

}
