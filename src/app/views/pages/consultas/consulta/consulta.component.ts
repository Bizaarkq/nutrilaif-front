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
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  //consultaForm = this.primeraConsulta.primeraConsulta();
  
  datosMedicos = this.consulta.primeraConsulta("datos_medicos");
  examenesLabs = this.consulta.primeraConsulta("examen_labs");
  datosAntropo = this.consulta.primeraConsulta("datos_antropo");
  historiaDiet = this.consulta.primeraConsulta("historia_dietetica");
  
  consultaForm = this.FB.group({
    //paciente: this.FB.group({}),
    datos_medicos: this.datosMedicos,
    examen_labs: this.examenesLabs,
    datos_antropo: this.datosAntropo,
    historia_dietetica: this.historiaDiet,
    // recordatorio: this.FB.group({}),
    // frecuencia_consumo: this.FB.group({}),
    // planificacion_dieta: this.FB.group({})
  });

  contador = 0;
  constructor(
    private FB: FormBuilder, 
    private consulta: ConsultaForm,
    private consultaService: ConsultaService) {}

  ngOnInit(): void {

  }

  passToFormGroup(form:string){
    return this.consultaForm.get(form) as FormGroup;
  }

  log(val:any){
    this.contador ++;
    console.log(this.contador,val);
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
