import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import recordatorioForm from './recordatorio.json';
@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.css']
})
export class RecordatorioComponent implements OnInit {
  @Input() formRecordatorio !: FormGroup;

  camposRecordatorio = recordatorioForm;
  horaInicioD:any;
  horaFinD:any;
  horaInicioRD:any;
  horaFinRD:any;
  horaInicioA:any;
  horaFinA:any;
  horaInicioRA:any;
  horaFinRA:any;
  horaInicioC:any;
  horaFinC:any;
  
  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    Object.entries(this.camposRecordatorio).forEach(([key, value]) => {
      this.formRecordatorio.addControl(key, this.fb.control('', 'validators' in  value ?
      value.validators?.map(function (validator) {
        if (!('params' in validator)) {
          return (Validators as any)[validator['type']];
        } else {
          return (Validators as any)[validator['type']]((validator as any).params);
        }
      }) : null
      ));
    });
  }

  validarCampo( campo:string ){
    return this.formRecordatorio.controls[campo].errors && 
            this.formRecordatorio.controls[campo].touched
  }
}
