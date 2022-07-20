import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ConsultaForm } from './consulta-form';
import { ConsultaService } from 'src/app/services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  //consultaForm = this.primeraConsulta.primeraConsulta();
  //Arreglo para algunos titulos mostrados en los step
  labelTitulos: string[] = ["Datos antropometricos", "Datos médicos", "Examenes de laboratorio", "Historia dietética" ];
  id: any;
  accion: any;
  esBorrador: any;
  esSubsecuente: boolean = false;
  visibleSpinner = false;
  consultaMap:any;
  datosMedicos!:FormGroup;
  examenesLabs!:FormGroup; 
  datosAntropo!:FormGroup; 
  historiaDiet!:FormGroup; 
  subConsultaForm!:FormGroup;
  id_paciente:any;
  loadingDataEdicion: boolean = false;
  numeroExpediente: any = null;

  paciente: FormGroup = this.FB.group({});
  recordatorio: FormGroup = this.FB.group({});
  frecuencia_consumo: FormGroup = this.FB.group({
    frecuencia: this.FB.array( [] )
  });
  planificacion_dieta: FormGroup = this.FB.group({});
  dieta: FormGroup = this.FB.group({});

  consultaForm:FormGroup = this.FB.group({});

  constructor(
    private FB: FormBuilder,
    private consulta: ConsultaForm,
    private consultaService: ConsultaService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}
    contador=0;
  ngOnInit(): void {
    this.consultaMap = this.consulta.mapeadoForm();
    this.id = this.route.snapshot.paramMap.get('id_consulta');
    this.accion = this.route.snapshot.paramMap.get('accion');
    this.id_paciente = this.route.snapshot.paramMap.get('id_paciente');

    if(this.id_paciente) this.paciente.addControl('id_paciente', this.FB.control(this.id_paciente));

    if ((this.accion === 'editar' || this.accion === 'ver') && this.id !== null) {
      this.visibleSpinner = true;
      this.loadingDataEdicion = true;
      this.consultaService.getconsulta(this.id).subscribe({
        next: (data) => {
          this.esBorrador = data.es_borrador;

          if(data.es_subsecuente){
            this.isSubsecuente();
          }else{
            this.isPrimeraConsulta();
          }
          this.consultaForm.patchValue(data);
          if (!this.esBorrador || this.accion === 'ver'){
            this.consultaForm.disable();
          };
        },
        error: (err) => {
          this.snack.open(
            'La información no pudo ser recuperada, intente nuevamente',
            'Ok',
            {
              duration: 3000,
            }
          );
        },
        complete: () => {
          this.loadingDataEdicion = false;
          this.visibleSpinner = false;
        }
      });
    } else if (this.accion == 'nueva' && this.id_paciente != null) {
      this.isSubsecuente();
    }else if (this.accion == 'nueva' && this.id_paciente === null ||this.id_paciente === undefined ) {
      this.isPrimeraConsulta();
    }

  }

  passToFormGroup(form: string) {
    return this.subConsultaForm.get(form) as FormGroup;
  }

  log(val: any) {
    console.log(val);
  }
  
  guardar() {
    this.visibleSpinner = true;
    this.consultaService.guardarConsulta(this.consultaForm.value, this.id).subscribe({
      next: (res) => {
        let duracion = 3000;
        if(res.data !== null){
          this.snack.open(
            'N° de Expediente para el nuevo paciente: ' + res.data, '',
            {
              duration: duracion,
            }
          );

          duracion -= 2000;
        }

        this.snack.open(
          res.mensaje, '',
          {
            duration: duracion,
          }
        );
        
        this.paciente.controls['numero_exp'].setValue(res.data);
        this.numeroExpediente = res.data;
        setTimeout(() => {
          this.router.navigate(['/expedientes']);
        }, 3000);
      },
      error: (err) => {
        this.snack.open(
          err.mensaje,
          '',
          {
            duration: 3000,
          }
        );
      },
      complete: () => {
        this.visibleSpinner = false;
      }
    });
  }

  isPrimeraConsulta(){
      this.datosMedicos = this.consulta.primeraConsulta('datos_medicos');
      this.examenesLabs = this.consulta.primeraConsulta('examen_labs');
      this.datosAntropo = this.consulta.primeraConsulta('datos_antropo');
      this.historiaDiet = this.consulta.primeraConsulta('historia_dietetica');

      this.subConsultaForm = this.FB.group({
        datos_medicos: this.datosMedicos,
        examen_labs: this.examenesLabs,
        datos_antropo: this.datosAntropo,
        historia_dietetica: this.historiaDiet,
      });
      this.consultaForm = this.FB.group({
        paciente: this.paciente,
        recordatorio: this.recordatorio,
        frecuencia_consumo: this.frecuencia_consumo,
        dieta: this.dieta,
        planificacion_dieta: this.planificacion_dieta,
        subconsulta_form: this.subConsultaForm,
        es_borrador: false
      });
      this.cd.detectChanges();
  }

  isSubsecuente(){
    this.esSubsecuente = true;
    this.datosMedicos = this.consulta.subsecuente('datos_medicos');
    this.examenesLabs = this.consulta.subsecuente('examen_labs');
    this.datosAntropo = this.consulta.subsecuente('datos_antropo');
    this.historiaDiet = this.consulta.subsecuente('historia_dietetica');

    this.subConsultaForm = this.FB.group({
      datos_medicos: this.datosMedicos,
      examen_labs: this.examenesLabs,
      datos_antropo: this.datosAntropo,
      historia_dietetica: this.historiaDiet,
    });
    this.consultaForm = this.FB.group({
      paciente: this.paciente,
      recordatorio: this.recordatorio,
      frecuencia_consumo: this.frecuencia_consumo,
      planificacion_dieta: this.planificacion_dieta,
      dieta: this.dieta,
      subconsulta_form: this.subConsultaForm,
      es_borrador: false
    });
    this.cd.detectChanges();
  }
  
}
