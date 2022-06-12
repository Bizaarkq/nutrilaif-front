import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-frecuencia-consumo',
  templateUrl: './frecuencia-consumo.component.html',
  styleUrls: ['./frecuencia-consumo.component.css']
})
export class FrecuenciaConsumoComponent {

  camposFrecuencia: string[] = [
    'nombre1',
    'frequencia1',
    'comentario1',
    'nombre2',
    'frequencia2',
    'comentario2',
    'nombre3',
    'frequencia3',
    'comentario3',
    'nombre4',
    'frequencia4',
    'comentario4',
    'nombre5',
    'frequencia5',
    'comentario5',
    'nombre6',
    'frequencia6',
    'comentario6',
  ];

  //Formulario
  frecuenciaConsumo!:FormGroup;

  constructor( private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const group:any = {};
    this.camposFrecuencia.forEach(property => group[property] = new FormControl());
    this.frecuenciaConsumo = new FormGroup(group);
  }
}
