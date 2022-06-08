import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Cons } from 'rxjs';
import { ConsultaForm } from './consulta-form';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  //consultaForm = this.primeraConsulta.primeraConsulta();
  datosMedicos = this.FB.group({
    diagnostico: [''],
    medicamento_suplemento: [''],
    otros_datos: ['']
  });
  examenesLabs = this.FB.group({
    hemoglobina: [''],
    linfocitos: [''],
    hba_1c: [''],
    creatinina: [''],
    trigliceridos: [''],
    colesterol_total: [''],
    chdl: [''],
    cldl: [''],
    glucosa_ayuno: [''],
    glucosa_post_pondrial: [''],
    acido_urico: [''],
    albumina: ['']
  });

  datosAntropo = this.FB.group({
    peso_actual: [''],
    peso_ideal: [''],
    p_grasa_corporal: [''],
    p_masa_muscular: [''],
    p_grasa_visceral: [''],
    peso_meta: [''],
    talla: [''],
    c_cintura: [''],
    imc: [''],
    edad_metabolica: [''],
    c_brazo_relaj: [''],
    c_cadera: [''],
    c_muneca: ['']
  });

  historiaDiet = this.FB.group({
    preferencia_alimen: [''],
    alimentos_no_gustan: [''],
    intolerancia_alergia: [''],
    actividad_fisica: [''],
    alcohol: [''],
    tabaco: [''],
  });
  
  consultaForm = this.FB.group({
    paciente: this.FB.group({}),
    datos_medicos: this.datosMedicos,
    examen_labs: this.examenesLabs,
    datos_antropo: this.datosAntropo,
    historia_dietetica: this.historiaDiet,
    recordatorio: this.FB.group({}),
    frecuencia_consumo: this.FB.group({}),
    planificacion_dieta: this.FB.group({})
  });

  constructor(
    private FB: FormBuilder, 
    private primeraConsulta: ConsultaForm,
    private consultaService: ConsultaService) {}

  ngOnInit(): void {
    console.log(this.datosAntropo.controls);
    console.log(this.consultaForm);
  }

  guardar() {
    console.log(this.consultaForm.value);
    this.consultaService.guardarConsulta(this.consultaForm.value, '123asd123')
    .subscribe(
      {
        next: res => {
          console.log("todo bien");
        },
        error: err =>{
          console.log('error');
        }
      }
    );
  }
}
