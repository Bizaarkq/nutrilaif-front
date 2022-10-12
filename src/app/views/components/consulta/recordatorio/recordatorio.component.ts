import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import recordatorioForm from './recordatorio.json';
import { ValidarFormService } from 'src/app/services/general.service';
@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.css']
})
export class RecordatorioComponent implements OnInit, OnChanges {
  @Input() formRecordatorio !: FormGroup;
  @Input() realizarValidacion: boolean = false;
  @Output() validacionForm = new EventEmitter<Object>();


  camposRecordatorio:{ [key:string] : any} = recordatorioForm;
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

  ngOnChanges(): void {
    if(this.realizarValidacion){
      if(this.realizarValidacion){
        this.validacionForm.emit({ 
          'form': 'Recordatorio de 24 Horas', 
          'campos': this.validandoForm()
        });
      }
    }
  }

  createForm():void{
    Object.entries(this.camposRecordatorio).forEach(([key, value]) => {
      this.formRecordatorio.addControl(key, this.fb.control('', 'validators' in  value ?
      value.validators?.map(function (validator:any) {
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

  validandoForm():Object{
    let data:any = ValidarFormService(this.formRecordatorio);
    let campos:any = {};

    if(data.incorrectos.length) campos.incorrectos = data.incorrectos.map((campo:any) => {
        return this.camposRecordatorio[campo].label;
      });

    if(data.vacios.length) campos.vacios = data.vacios.map((campo:any) => {
        return this.camposRecordatorio[campo].label;
      });

    return campos;
  }
}
