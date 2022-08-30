import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalExtenderSesionComponent } from 'src/app/views/components/shared/modal-extender-sesion/modal-extender-sesion.component';


@Component({
  selector: 'app-listado-expediente',
  templateUrl: './listado-expediente.component.html',
  styleUrls: ['./listado-expediente.component.css']
})
export class ListadoExpedienteComponent implements OnInit {

  columnas: string[] = ['num_expediente', 'nombre_completo', 'apellidos','telefono','correo','acciones'];
  tablaData !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  visibleSpinner = false;

  constructor( 
    private pacienteService:DatosPersonalesService, 
    private router:Router, 
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes(){
    this.visibleSpinner=true;
    this.pacienteService.getDatosPersonales()
    .subscribe({
      next:(res)=>{
        this.tablaData = new MatTableDataSource(res);
        this.tablaData.paginator = this.paginator;
        this.tablaData.sort = this.sort;
        this.visibleSpinner=false;
      }
    });
  }

  filtroExpediente(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.tablaData.filter = filterValue.trim().toLowerCase();

    if (this.tablaData.paginator) {
      this.tablaData.paginator.firstPage();
    }
  }

  eliminarExpediente(paciente: any){
    //Modal para solicitar confirmación de eliminación de expediente
    const dialog = this.dialog.open( ModalExtenderSesionComponent, {
      width: '30%',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: '¿Desea eliminar de forma permanente el expediente seleccionado?',
        boton: 'Aceptar'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if(result) {
        this.visibleSpinner=true;
        this.pacienteService.deletePaciente(paciente.id).subscribe({
          next:(res)=>{
            this.visibleSpinner=false;
                  this.snack.open(
                    res.mensaje,
                    'OK',
                    {
                      duration: 3000,
                    }
                  );
            this.cargarExpedientes();
          },
          error:(err)=>{
            this.visibleSpinner=false;
            this.snack.open(
              err.mensaje,
              'OK',
              {
                duration: 3000,
              }
            );     
          }
        });
      }
    });
  }
}
