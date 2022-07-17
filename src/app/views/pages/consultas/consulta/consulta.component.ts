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
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  //consultaForm = this.primeraConsulta.primeraConsulta();
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

  paciente: FormGroup = this.FB.group({});
  recordatorio: FormGroup = this.FB.group({});
  frecuencia_consumo: FormGroup = this.FB.group({});
  planificacion_dieta: FormGroup = this.FB.group({});

  consultaForm:FormGroup = this.FB.group({});

  constructor(
    private FB: FormBuilder,
    private consulta: ConsultaForm,
    private consultaService: ConsultaService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {}
    contador=0;
  ngOnInit(): void {
    this.consultaMap = this.consulta.mapeadoForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.accion = this.route.snapshot.paramMap.get('accion');
    this.id_paciente = history.state['id_paciente'];
    if(this.id_paciente) this.paciente.addControl('id_paciente', this.FB.control(this.id_paciente));

    if (this.accion === 'editar' && this.id !== null) {
      this.visibleSpinner = true;
      this.consultaService.getconsulta(this.id).subscribe({
        next: (data) => {
          console.log(data.es_subsecuente);
          this.esBorrador = data.es_borrador === 1 ? true : false;
          if (!this.esBorrador) this.consultaForm.disable();

          if(data.es_subsecuente){
            this.isSubsecuente();
          }else{
            this.isPrimeraConsulta();
          }
          this.consultaForm.patchValue(data);
          this.visibleSpinner = false;
        },
        error: (err) => {
          this.visibleSpinner = false;
          this.snack.open(
            'La información no pudo ser recuperada, intente nuevamente',
            'Ok',
            {
              duration: 3000,
            }
          );
        },
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
    this.contador++;
  }
  guardar() {
    this.consultaService.guardarConsulta(this.consultaForm.value, this.id).subscribe({
      next: (res) => {
        this.snack.open(
          'La consulta se guardadó correctamente',
          'Ok',
          {
            duration: 3000,
          }
        );
      },
      error: (err) => {
        this.snack.open(
          'La consulta no pudo ser guardada, intente nuevamente',
          'Ok',
          {
            duration: 3000,
          }
        );
      },
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
        planificacion_dieta: this.planificacion_dieta,
        subconsulta_form: this.subConsultaForm,
        es_borrador: false
      });
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
      subconsulta_form: this.subConsultaForm,
      es_borrador: false
    });
  }

}
