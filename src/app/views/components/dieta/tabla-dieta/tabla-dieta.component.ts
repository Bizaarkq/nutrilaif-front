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
    Object.entries(this.camposDieta).forEach(([key, value]) => {
      this.formularioDieta.addControl(key, this.fb.control('', 
      value.validators?.map(function (validator) {
        if (!validator.includes(':')) {
          return (Validators as any)[validator];
        } else {
          let parametros = validator.split(':');
          return (Validators as any)[parametros[0]](parametros[1]);
        }
      })
      ));
    });
  }
  
  validarCampo( campo:string ){
    return this.formularioDieta.controls[campo].errors && 
      this.formularioDieta.controls[campo].touched;
    
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
}
