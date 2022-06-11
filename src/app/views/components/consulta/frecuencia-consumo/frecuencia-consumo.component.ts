import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-frecuencia-consumo',
  templateUrl: './frecuencia-consumo.component.html',
  styleUrls: ['./frecuencia-consumo.component.css']
})
export class FrecuenciaConsumoComponent {
  frecuenciaConsumo:FormGroup = this.fb.group({
    frecuencias: this.fb.array([], Validators.required)
  });
  constructor( private fb:FormBuilder ) { }

  ngOnInit(): void {

  }

  get frecuencias(){
    return this.frecuenciaConsumo.controls["frecuencias"] as FormArray;
  }

  addFrecuencia(){

    const frecuenciaForm:FormGroup = this.fb.group({
      nombre: ['', Validators.required],
      freq: ['0', Validators.required],
      comentario: ['',]
    });

    this.frecuencias.push(frecuenciaForm);
  }

  deleteFrecuencia(frecuenciaIndex:number){
    this.frecuencias.removeAt(frecuenciaIndex);
  }
}


// frecuenciaConsumo: FormGroup = this.fb.group({
  //   frecuencia: this.fb.array( [
  //     ['Naranja', Validators.required],
  //     [1],
  //     ['En cuatro partes']
  //   ], Validators.required )
  // })
  