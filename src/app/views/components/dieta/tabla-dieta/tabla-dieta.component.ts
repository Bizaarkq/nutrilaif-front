import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import dietaForm from './form_dieta.json';
import { ValidarFormService } from 'src/app/services/general.service';
import { DietaService } from 'src/app/services/dieta.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tabla-dieta',
  templateUrl: './tabla-dieta.component.html',
  styleUrls: ['./tabla-dieta.component.css']
})
export class TablaDietaComponent implements OnInit, OnChanges{
  fechaCreacion = new Date().getDate();
  //Formulario de dieta recibido desde la pagina de consulta
  @Input() formularioDieta !: FormGroup;
  @Input() subSec:boolean=false;
  @Input() realizarValidacion: boolean = false;
  @Output() validacionForm = new EventEmitter<Object>();

  idPaciente:any;
  //Formulario de dieta
  camposDieta = dietaForm;
  constructor( private fb: FormBuilder, private dietaService:DietaService, private ar:ActivatedRoute) { }

  ngOnInit(): void {
    //Metodo que crea el formulario al iniciar el componente agregando los controles necesarios para el componente
    this.addControls();
    this.formularioDieta.disable();
    this.idPaciente = this.ar.snapshot.paramMap.get('id_paciente');
  }

  ngOnChanges(): void {
    if(this.realizarValidacion){
        Object.entries(dietaForm.dias).forEach(([key, dia])=> {
          this.validacionForm.emit({ 
            'form': `Dieta (${dia.label})`, 
            'campos': this.validandoForm(dia.name)
          });
        });
    }
  }
  
  addControls(){

    //Formulario reactivo de dieta --- Explicacion de variables: primera letra relacionada al dia de semana, luego la palabra del tiempo de comida
    Object.entries(dietaForm.fechaDieta).forEach(([key, value])=> {
      this.formularioDieta.addControl(value.name, this.fb.control(new Date(), [Validators.required]));
    });
    
    this.formularioDieta.addControl('planDeDieta', this.fb.control('', [Validators.required]));

    this.formularioDieta.addControl('dieta', this.fb.group({}));
    
    Object.entries(dietaForm.dias).forEach(([key, value])=> {
      (this.formularioDieta.controls['dieta'] as FormGroup).addControl(value.name, this.fb.group({}));

      Object.entries(dietaForm.tiemposComida).forEach(([key2, value2])=>{
        ((this.formularioDieta.controls['dieta'] as FormGroup).controls[value.name] as FormGroup).
          addControl(value2.name, this.fb.control('',
            value2.validator.map(function (validator:any) {
              if ('params' in validator) {
                return (Validators as any)[validator.type](
                  validator.params
                );
              } else {
                return (Validators as any)[validator.type];
              }
            })
        )) 
      })
    });
  }
  
  validarCampo( control:string, subForm:string = '' ){
    if (subForm === ''){
      return this.formularioDieta.controls[control].errors &&
        this.formularioDieta.controls[control].touched;
    } else {
      return ((this.formularioDieta.controls['dieta'] as FormGroup).controls[subForm] as FormGroup).controls[control].errors && 
        ((this.formularioDieta.controls['dieta'] as FormGroup).controls[subForm] as FormGroup).controls[control].touched;
    }
  }

  limpiar(){
    this.formularioDieta.reset();
  }

  editarDieta(){
    this.formularioDieta.enable();
  }

  passToFormGroup(form: string, sub_form: string = '') {
    if (sub_form === '') {
      return this.formularioDieta.get(form) as FormGroup;
    } else {
      return (this.formularioDieta.get(form) as FormGroup).get(
        sub_form
      ) as FormGroup;
    }
  }

  validandoForm(subForm:string):Object{
    let data:any = ValidarFormService(this.passToFormGroup('dieta', subForm));
    let campos:any = {
      vacios: []
    };
    
    if(data.incorrectos.length) campos.vacios.push(...data.incorrectos.map((campo:any) => {
        return dietaForm.tiemposComida.find((e) => e.name === campo)?.label;
      }));

    if(data.vacios.length) campos.vacios.push(...data.vacios.map((campo:any) => {
        return dietaForm.tiemposComida.find((e) => e.name === campo)?.label;
      }));
    return campos;
  }

  guardarDieta(){
    this.dietaService.obtenerPdf(this.idPaciente, this.formularioDieta.value).subscribe(data => {
      let file = window.URL.createObjectURL(data);
      window.open(file);
      });

    }
}
