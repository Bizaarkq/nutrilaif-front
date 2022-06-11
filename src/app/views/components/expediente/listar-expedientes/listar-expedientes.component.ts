import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExpedientesService } from 'src/app/services/expedientes.service';

@Component({
  selector: 'app-listar-expedientes',
  templateUrl: './listar-expedientes.component.html',
  styleUrls: ['./listar-expedientes.component.css']
})
export class ListarExpedientesComponent implements OnInit {

  displayedColumns:string[] = ['numero_exp', 'nombre', 'apellido', 'telefono', 'correo'];
  dataSource!: MatTableDataSource<any>;

  constructor(private api:ExpedientesService) { }

  ngOnInit(): void {
    this.cargarExpedientes();
  }
  
  //Cargar expedientes
  cargarExpedientes(){
    this.api.getExpedientes()
    .subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res);
      }, 
      error: (err) =>{
        alert("No se pueden obtener los expedientes");
      }
    })
  }
}
