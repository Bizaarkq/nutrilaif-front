import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla-dieta',
  templateUrl: './tabla-dieta.component.html',
  styleUrls: ['./tabla-dieta.component.css']
})
export class TablaDietaComponent implements OnInit {
  fechaCreacion = new Date().getDate();
  //Formulario de dieta recibido desde la pagina de consulta
  @Input() formularioDieta !: FormGroup;
  //Formulario de dieta
  camposDieta = {
    "fechaCreacionDieta"        :{
      "validators": null
    },
    "lDesayuno"           : {
      "validators": [Validators.required],
    },
    "lRefrigerioDesayuno" : {
      "validators": [Validators.required],
    },
    "lAlmuerzo"           : {
      "validators": [Validators.required],
    },
    "lRefrigerioAlmuerzo" : {
      "validators": [Validators.required],
    },
    "lCena"               : {
      "validators": [Validators.required],
    },
    "mDesayuno"           : {
      "validators": [Validators.required],
    },
    "mRefrigerioDesayuno" : {
      "validators": [Validators.required],
    },
    "mAlmuerzo"           : {
      "validators": [Validators.required],
    },
    "mRefrigerioAlmuerzo" : {
      "validators": [Validators.required],
    },
    "mCena"               : {
      "validators": [Validators.required],
    },
    "miDesayuno"          : {
      "validators": [Validators.required],
    },
    "miRefrigerioDesayuno": {
      "validators": [Validators.required],
    },
    "miAlmuerzo"          : {
      "validators": [Validators.required],
    },
    "miRefrigerioAlmuerzo": {
      "validators": [Validators.required],
    },
    "miCena"              : {
      "validators": [Validators.required],
    },
    "juDesayuno"          : {
      "validators": [Validators.required],
    },
    "juRefrigerioDesayuno": {
      "validators": [Validators.required],
    },
    "juAlmuerzo"          : {
      "validators": [Validators.required],
    },
    "juRefrigerioAlmuerzo": {
      "validators": [Validators.required],
    },
    "juCena"              : {
      "validators": [Validators.required],
    },
    "vDesayuno"           : {
      "validators": [Validators.required],
    },
    "vRefrigerioDesayuno" : {
      "validators": [Validators.required],
    },
    "vAlmuerzo"           : {
      "validators": [Validators.required],
    },
    "vRefrigerioAlmuerzo" : {
      "validators": [Validators.required],
    },
    "vCena"               : {
      "validators": [Validators.required],
    },
    "sDesayuno"           : {
      "validators": [Validators.required],
    },
    "sRefrigerioDesayuno" : {
      "validators": [Validators.required],
    },
    "sAlmuerzo"           : {
      "validators": [Validators.required],
    },
    "sRefrigerioAlmuerzo" : {
      "validators": [Validators.required],
    },
    "sCena"               : {
      "validators": [Validators.required],
    },
    "dDesayuno"   : {
      "validators":  [Validators.required],
    },
    "dRefrigerioDesayuno" : {
      "validators":  [Validators.required],
    },
    "dAlmuerzo"           : {
      "validators":  [Validators.required],
    },
    "dRefrigerioAlmuerzo" : {
      "validators":  [Validators.required],
    },
    "dCena"               : {
      "validators":  [Validators.required],
    }
  }
  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    //Metodo que crea el formulario al iniciar el componente agregando los controles necesarios para el componente
    this.addControls();
  }
  
  addControls(){
    //Formulario reactivo de dieta --- Explicacion de variables: primera letra relacionada al dia de semana, luego la palabra del tiempo de comida
    Object.entries(this.camposDieta).forEach(([key, value]) => {
      this.formularioDieta.addControl(key, this.fb.control('', value.validators))
    })
  }
  
  validarCampo( campo:string ){
    return this.formularioDieta.controls[campo].errors && 
      this.formularioDieta.controls[campo].touched;
    
  }

  getErrorMessage() {
    return 'You must enter a value';
  }
}
