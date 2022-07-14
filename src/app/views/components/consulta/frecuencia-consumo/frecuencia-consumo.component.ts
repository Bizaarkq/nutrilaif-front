import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-frecuencia-consumo',
  templateUrl: './frecuencia-consumo.component.html',
  styleUrls: ['./frecuencia-consumo.component.css']
})
export class FrecuenciaConsumoComponent {
  //Formulario a utilizar para la frecuencia de consumo
  //@Input() formularioFrecuencia!: FormGroup;
  //Titulos utilizados en el componente de frecuencia de consumo
  formularioFrecuencia!: FormGroup;
  titulos: string[] = ['Alimento', 'Frecuencia de consumo', 'Comentarios'];

  constructor( private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formularioFrecuencia = this.fb.group({
      frecuencia: this.fb.array( [] )
    });
  }
  //Metodo get intermedio para obtener el FormArray de un FormGroup
  get frecuencias():FormArray{
    return this.formularioFrecuencia.get('frecuencia') as FormArray;
  }

  //Metodo encargado de crear un formGroup 
  newFrecuencia(): FormGroup {
    return this.fb.group({
      alimento  : ['', Validators.required],
      frequencia: ['', Validators.required],
      comentario: ['', ]
    })
  }

  //Metodo para agregar un formGroup a el arreglo de frecuencias de consumo
  addFrecuencia(){
    this.frecuencias.push( this.newFrecuencia() );
  }

  //Metodo para eliminar un elemento del arreglo de frecuencias de consumo
  removeFrecuencia( i:number ){
    this.frecuencias.removeAt( i );
  }
  
}
