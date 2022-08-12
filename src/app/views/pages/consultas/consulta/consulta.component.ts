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
import ConsultaGeneralForm from './forms/consulta-form-general.json';
import ConsultaGeneralSubSecuenteForm from './forms/consulta-form-general-sub.json';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  subConsulta: object = {};
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
  subConsultaForm :FormGroup = this.FB.group({});
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
            this.subConsulta = ConsultaGeneralSubSecuenteForm;
          }else{
            this.subConsulta = ConsultaGeneralForm;
          }
          this.createSubForm();
          this.consultaForm.patchValue(data);
          (this.frecuencia_consumo.get('frecuencia') as FormArray).removeAt(0); 
          
          data.frecuencia_consumo.frecuencia.forEach((f:any) => (
            this.frecuencia_consumo.get('frecuencia') as FormArray).push(this.FB.group(f))
          );
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
      this.subConsulta = ConsultaGeneralSubSecuenteForm;
      this.createSubForm();
    }else if (this.accion == 'nueva' && this.id_paciente === null ||this.id_paciente === undefined ) {
      this.subConsulta = ConsultaGeneralForm;
      this.createSubForm();
    }

  }

  passToFormGroup(form: string) {
    return this.subConsultaForm.get(form) as FormGroup;
  }

  getControlSubConsulta(form:string){
    return this.subConsultaForm.controls[form] as FormControl;
  }

  log(val: any) {
    console.log(val);
  }
  
  guardar() {
    this.visibleSpinner = true;
    this.consultaService.guardarConsulta(this.consultaForm.value, this.id).subscribe({
      next: (res) => {
        let duracion = 5000;
        if(res.data != null){
          this.snack.open(
            'N° de Expediente para el nuevo paciente: ' + res.data, '',
            {
              duration: duracion/2,
            }
          );

          setTimeout(() => {
             this.snack.open(res.mensaje, '', {
               duration: duracion / 2,
             });
          }, duracion/2);
          
        }else{
          this.snack.open(
            res.mensaje, '',
            {
              duration: duracion,
            }
          );
        }

        this.paciente.controls['numero_exp'].setValue(res.data);
        this.numeroExpediente = res.data;
        setTimeout(() => {
          this.router.navigate(['/expedientes']);
        }, duracion);
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

  createSubForm(){
      Object.entries(this.subConsulta).forEach(([key, value]) => {
        this.subConsultaForm.addControl(value.step, this.FB.group({}));
        value.controls.forEach((control: any) => {
          (this.subConsultaForm.controls[value.step] as FormGroup).addControl(control.name, this.FB.control(
            '', 'validators' in control ?
            control.validators.map(function (validator : any) {
              if( 'params' in validator ){
                return (Validators as any)[validator['type']]((validator as any).params);
              }else{
                return (Validators as any)[validator.type];
              }
            }) : null
          ));
        });
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
  
}
