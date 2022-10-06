import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import dietaForm from './form_dieta.json';
@Component({
  selector: 'app-tabla-dieta',
  templateUrl: './tabla-dieta.component.html',
  styleUrls: ['./tabla-dieta.component.css']
})
export class TablaDietaComponent implements OnInit {
  fechaCreacion = new Date().getDate();
  //Formulario de dieta recibido desde la pagina de consulta
  @Input() formularioDieta !: FormGroup;
  @Input() subSec:boolean=false;
  //Formulario de dieta
  camposDieta = dietaForm;
  accion:any;
  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    //Metodo que crea el formulario al iniciar el componente agregando los controles necesarios para el componente
      this.addControls();
      this.formularioDieta.disable();
      this.accion===!('ver');
  }
  
  addControls(){

    //Formulario reactivo de dieta --- Explicacion de variables: primera letra relacionada al dia de semana, luego la palabra del tiempo de comida
    Object.entries(dietaForm.fechaDieta).forEach(([key, value])=> {
      this.formularioDieta.addControl(value.name, this.fb.control(new Date(), [Validators.required]));
    });

    this.formularioDieta.addControl('dieta', this.fb.group({}));
    
    Object.entries(dietaForm.dias).forEach(([key, value])=> {
      (this.formularioDieta.controls['dieta'] as FormGroup).addControl(value.name, this.fb.group({}));

      Object.entries(dietaForm.tiemposComida).forEach(([key2, value2])=>{
        ((this.formularioDieta.controls['dieta'] as FormGroup).controls[value.name] as FormGroup).
          addControl(value2.name, this.fb.control('',
            value2.validator.map(function (validator:any) {
              if ('params' in validator) {
                return (Validators as any)[validator.type](
                  validator.params
                );
              } else {
                return (Validators as any)[validator.type];
              }
            })
        )) 
      })
    });

    console.log(this.formularioDieta);
  }
  
  validarCampo( control:string, subForm:string = '' ){
    if (subForm === ''){
      return this.formularioDieta.controls[control].errors &&
        this.formularioDieta.controls[control].touched;
    } else {
      return ((this.formularioDieta.controls['dieta'] as FormGroup).controls[subForm] as FormGroup).controls[control].errors && 
        ((this.formularioDieta.controls['dieta'] as FormGroup).controls[subForm] as FormGroup).controls[control].touched;
    } 
    
  }

  getErrorMessage() {
    return 'You must enter a value';
  }
  limpiar(){
    this.formularioDieta.reset();
  }
  editarDieta(){
    this.formularioDieta.enable();
  }

  passToFormGroup(form: string, sub_form: string = '') {
    if (sub_form === '') {
      return this.formularioDieta.get(form) as FormGroup;
    } else {
      return (this.formularioDieta.get(form) as FormGroup).get(
        sub_form
      ) as FormGroup;
    }
  }
}
