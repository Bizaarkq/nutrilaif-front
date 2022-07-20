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
  
  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    Object.entries(this.camposRecordatorio).forEach(([key, value]) => {
      this.formRecordatorio.addControl(key, this.fb.control('', 
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
    return this.formRecordatorio.controls[campo].errors && 
            this.formRecordatorio.controls[campo].touched
  }
}
