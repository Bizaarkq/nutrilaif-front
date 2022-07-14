import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-expediente',
  templateUrl: './listado-expediente.component.html',
  styleUrls: ['./listado-expediente.component.css']
})
export class ListadoExpedienteComponent implements OnInit {

  columnas: string[] = ['num_expediente', 'nombre_completo', 'acciones'];
  tablaData !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private pacienteService:DatosPersonalesService, private router:Router) { }
  
  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes(){
    this.pacienteService.getDatosPersonales()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.tablaData = new MatTableDataSource(res);
        this.tablaData.paginator = this.paginator;
        this.tablaData.sort = this.sort;
      }
    })
  }

  filtroExpediente(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.tablaData.filter = filterValue.trim().toLowerCase();

    if (this.tablaData.paginator) {
      this.tablaData.paginator.firstPage();
    }
  }

  eliminarExpediente(paciente: any){
    console.log(paciente);
    this.pacienteService.deletePaciente(paciente.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cargarExpedientes();
      },
      error:(err)=>{}
    });
  }

}
