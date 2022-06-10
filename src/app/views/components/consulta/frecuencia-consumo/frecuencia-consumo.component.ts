import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

const ELEMENT_DATA = [
  {alimento: 'Cereal', },
];

@Component({
  selector: 'app-frecuencia-consumo',
  templateUrl: './frecuencia-consumo.component.html',
  styleUrls: ['./frecuencia-consumo.component.css']
})
export class FrecuenciaConsumoComponent {
  
  displayedColumns: string[] = ['nombre', 'frecuencia', 'comentario'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {

    
  }

}
