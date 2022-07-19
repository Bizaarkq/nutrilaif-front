import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.css']
})
export class RecordatorioComponent implements OnInit {
  @Input() formRecordatorio !: FormGroup;

  camposRecordatorio = {
    //Desayuno
    "desayunoHora"          : {
      "label": "Hora del desayuno",
      "validators": [Validators.required]
    },
    "recordatorioDesayuno"  : {
      "label": "Recordatorio del desayuno",
      "validators": [Validators.required]
    },
    //Refrigerio del desayuno
    "desayunoRefrigerioHora": {
      "label": "Hora del refrigerio",
      "validators": [Validators.required]
    },
    "recordatorioRefrigerioDesayuno": {
      "label": "Recordatorio del refrigerio del desayuno",
      "validators": [Validators.required]
    },
    //Almuerzo
    "almuerzoHora"          : {
      "label": "Hora del almuerzo",
      "validators": [Validators.required]
    },
    "recordatorioAlmuerzo"  : {
      "label": "Recordatorio del almuerzo",
      "validators": [Validators.required]
    },
    //Refrigerio del almuerzo
    "almuerzoRefrigerioHora"    : {
      "label": "Refrigerio almuerzo",
      "validators": [Validators.required]
    },
    "recordatorioRefrigerioAlmuerzo": {
      "label": "Recordatorio del almuerzo",
      "validators": [Validators.required]
    },
    //Cena
    "cenaHora"              : {
      "label": "Hora de la cena",
      "validators": [Validators.required]
    },
    "recordatorioCena"      : {
      "label": "Recordatorio de la cena",
      "validators": [Validators.required]
    }, 
    //Otros campos
    "caloriasTotales"       : {
      "validators": [Validators.required]
    },
    "cumplimientoCalorias"  : {
      "validators": [Validators.required]
    },
    "cho"                   : {
      "validators": [Validators.required]
    },
    "cumplimientoCho"       : {
      "validators": [Validators.required]
    },
    "chon"                  : {
      "validators": [Validators.required]
    },
    "cumplimientoChon"      : {
      "validators": [Validators.required]
    },
    "cooh"                  : {
      "validators": [Validators.required]
    },
    "cumplimientoCooh"      : {
      "validators": [Validators.required]
    },
    "consumoAgua"           : {
      "validators": [Validators.required]
    }
  }
  
  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    Object.entries(this.camposRecordatorio).forEach(([key, value]) => {
      this.formRecordatorio.addControl(key, this.fb.control('', value.validators));
    });
  }

  validarCampo( campo:string ){
    return this.formRecordatorio.controls[campo].errors && 
            this.formRecordatorio.controls[campo].touched
  }
}
