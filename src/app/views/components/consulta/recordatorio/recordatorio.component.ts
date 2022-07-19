import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.css']
})
export class RecordatorioComponent implements OnInit {

  camposRecordatorio: string[] = [
    //Desayuno
    'desayunoHora', 
    'comentarioDes',
    'recordatorioDesH',
    'recordatorioDesC',
    //Almuerzo
    'almuerzoHora',
    'comentarioAlm',
    'recordatorioAlmH',
    'recordatorioAlmC',
    //Cena
    'cenaHora', 
    'comentarioCena',
  ]

  formRecordatorio!: FormGroup;
  constructor(private fb:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    const group:any = {};
    this.camposRecordatorio.forEach(property => group[property] = new FormControl());
    this.formRecordatorio = new FormGroup(group);
  }
}
