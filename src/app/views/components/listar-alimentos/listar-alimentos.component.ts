import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlimentosService } from 'src/app/services/alimentos.service';
import { Alimento } from '../../../interfaces/Alimento';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlimentoComponent } from '../dialog-alimento/dialog-alimento.component';

@Component({
  selector: 'app-listar-alimentos',
  templateUrl: './listar-alimentos.component.html',
  styleUrls: ['./listar-alimentos.component.css']
})
export class ListarAlimentosComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'pais', 'nombre', 'calorias', 'grasas', 'proteinas', 'carbohidratos', 'hierro', 'potasio', 'calcio', 'sodio', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  visibleSpinner = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarAlimentos();
  }
  constructor(private dialog:MatDialog, private api:AlimentosService, private snack: MatSnackBar){

  }
  openDialog() {
    this.dialog.open(DialogAlimentoComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'guardar'){
        this.cargarAlimentos();
      }
    })
  }
  cargarAlimentos(){
    this.visibleSpinner = true;
    this.api.getAlimentos()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.visibleSpinner = false;
      },
      error:()=>{
        this.snack.open(
          "No se pueden obtener los alimentos",
          'OK',
          {
            duration: 5000,
          }
        );
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarAlimento(alimento:any){
    this.visibleSpinner=true;
    this.api.eliminarAlimento(alimento.codigo)
    .subscribe({
      next:(res)=>{
        this.visibleSpinner=false;
        this.snack.open(
          res.mensaje,
          'OK',
          {
            duration: 3000,
          }
        );
        this.cargarAlimentos();
      },
      error:(res)=>{
        this.visibleSpinner=false;
        this.snack.open(
          res.mensaje,
          'OK',
          {
            duration: 3000,
          }
        );
      }
    })
  }

  editarAlimento(row:any){
    this.dialog.open(DialogAlimentoComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'actualizar'){
        this.cargarAlimentos();
      }
    })
  }
}
