import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  columnas: string[] = ['fecha_consulta', 'acciones'];
  tablaData !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  visibleSpinner = false;
  id_paciente: any;
  embarazada:any;
  urlGraphic = environment.dashboardUrl;
  url:any;

  habilitar:boolean=false;
  expedienteForm: FormControl = new FormControl();
  
  constructor(
    private consultaServie: ConsultaService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id_paciente = this.router.snapshot.paramMap.get('id_paciente');
    this.cargarConsultas(this.id_paciente);
    this.reportesUrl();
  }

  cargarConsultas(id_paciente: any){
    this.consultaServie.getListadoConsultas(id_paciente).subscribe({
      next:(res)=>{
        this.tablaData = new MatTableDataSource(res);
        this.tablaData.paginator = this.paginator;
        this.tablaData.sort = this.sort;
        this.visibleSpinner=false;
      }
    });
  }

  filtroConsultas(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.tablaData.filter = filterValue.trim().toLowerCase();

    if (this.tablaData.paginator) {
      this.tablaData.paginator.firstPage();
    }
  }

  btnEditarExpediente(){
    //this.habilitar = this.expedienteForm.value;
    this.habilitar = true;
  }

  getEmbarazo(respuesta:boolean){
    this.embarazada=respuesta;
  }
  
  reportesUrl(){
    let tema = localStorage.getItem('theme') === 'dark-theme' ? 'dark' : 'light';
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlGraphic + '?orgId=1&var-idPaciente=' + this.id_paciente + '&kiosk=tv&theme=' + tema);
  }

}
