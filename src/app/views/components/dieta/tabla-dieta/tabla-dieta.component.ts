import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla-dieta',
  templateUrl: './tabla-dieta.component.html',
  styleUrls: ['./tabla-dieta.component.css']
})
export class TablaDietaComponent implements OnInit {
  //Variable para los titulos de la tabla de Dias de la semana 
  dias:string [] = ['Lunes', 'Martes', 'Miércoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];
  

  //Formulario reactivo de dieta --- Explicacion de variables: primera letra relacionada al dia de semana, luego la palabra del tiempo de comida
  formularioDieta: FormGroup = this.fb.group({
    //Lunes
    lDesayuno: ['', Validators.required],
    lRefrigerioDesayuno: ['', Validators.required],
    lAlmuerzo: ['', Validators.required],
    lRefrigerioAlmuerzo: ['', Validators.required],
    lCena: ['', Validators.required],

    //Martes
    mDesayuno: ['', Validators.required],
    mRefrigerioDesayuno: ['', Validators.required],
    mAlmuerzo: ['', Validators.required],
    mRefrigerioAlmuerzo: ['', Validators.required],
    mCena: ['', Validators.required],

    //Miercoles
    miDesayuno: ['', Validators.required],
    miRefrigerioDesayuno: ['', Validators.required],
    miAlmuerzo: ['', Validators.required],
    miRefrigerioAlmuerzo: ['', Validators.required],
    miCena: ['', Validators.required],

    //Jueves
    juDesayuno: ['', Validators.required],
    juRefrigerioDesayuno: ['', Validators.required],
    juAlmuerzo: ['', Validators.required],
    juRefrigerioAlmuerzo: ['', Validators.required],
    juCena: ['', Validators.required],

    //Viernes
    vDesayuno: ['', Validators.required],
    vRefrigerioDesayuno: ['', Validators.required],
    vAlmuerzo: ['', Validators.required],
    vRefrigerioAlmuerzo: ['', Validators.required],
    vCena: ['', Validators.required],

    //Sabado
    sDesayuno: ['', Validators.required],
    sRefrigerioDesayuno: ['', Validators.required],
    sAlmuerzo: ['', Validators.required],
    sRefrigerioAlmuerzo: ['', Validators.required],
    sCena: ['', Validators.required],

    //Domingo
    dDesayuno: ['', Validators.required],
    dRefrigerioDesayuno: ['', Validators.required],
    dAlmuerzo: ['', Validators.required],
    dRefrigerioAlmuerzo: ['', Validators.required],
    dCena: ['', Validators.required],

  })

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  validarCampo( campo:string ){
    return this.formularioDieta.controls[campo].errors && 
      this.formularioDieta.controls[campo].touched;
    
  }

  getErrorMessage() {
    return 'You must enter a value';
  }
}
