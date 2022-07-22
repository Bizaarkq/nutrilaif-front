import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PlanificacionDieta} from 'src/app/interfaces/PlanificacionDieta';
import planAlimenticioForm from './plan-alimenticio.json';

@Component({
  selector: 'app-planificacion-dieta',
  templateUrl: './planificacion-dieta.component.html',
  styleUrls: ['./planificacion-dieta.component.css']
})
export class PlanificacionDietaComponent implements OnInit {

  @Input() planAlimenticio !: FormGroup;
  //Variable para manejar el formulario de datos personales
  formPlanAlimenticio = planAlimenticioForm;
  numero_intercambio:any;

  constructor(
    private authService: AuthService,
    private FB: FormBuilder,
    private router: Router,
    private snack: MatSnackBar
  ) { }

    columns = ["Alimento", "N° de int", "CHO g","CHON g", "CHOON g", "Kcal", "Na","Comentarios"]


  distribucion_alimento: FormGroup = this.FB.group({
    "n_int": [''],
    "chos": [''], 
    "choc": [''], 
    "chon": [''], 
    "cooh": [''], 
    "kcal": [''], 
    "na": [''], 
    "comentario": [''],  
  });

  patron_menu: FormGroup = this.FB.group({
    "n_int": [''],
    "chos": [''], 
    "choc": [''], 
    "chon": [''], 
    "cooh": [''], 
    "kcal": [''], 
    "na": [''], 
    "comentario": [''],  
  });

  formPlanDieta:FormGroup = this.FB.group({
    requerimiento_energetico:[''],
    calorias_prescribir:[''],
    choc:[''],
    chon:[''],
    cooh:[''],
    preescripcion_dieta:[''],
  });

  formtotal_alimento:FormGroup = this.FB.group({
    total_int:[''],
    calorias_prescribir:[''],
    choc:[''],
    chon:[''],
    cooh:[''],
    preescripcion_dieta:[''],
  });

  alimentos = [
      'leche',
      'suplemento',
      'vegetales',
      'frutas',
      'panes',
      'carnes magras',
      'carnes semi grasas',
      'carnes grasas',
      'grasas'
  ];


distribucionNutriente:FormGroup = this.FB.group({});

ngOnInit(): void {
    Object.entries(this.formPlanAlimenticio.manejo_planificacion).forEach(([key, value]) => {
      this.planAlimenticio.addControl(key, this.FB.group({}));
      Object.entries(value.controls).forEach(([key2, value2]) => {
        (this.planAlimenticio.controls[key] as FormGroup).addControl(key2, this.FB.control(''));
      });
    });

    this.planAlimenticio.addControl('alimentos', this.FB.group({}));
    Object.entries(this.formPlanAlimenticio.tablas.alimentos).forEach(([key, value]) => {
      (this.planAlimenticio.controls['alimentos'] as FormGroup).addControl(key, this.FB.group({}));
      Object.entries(this.formPlanAlimenticio.tablas.form_alimento).forEach(([key2, value2]) => {
        
        Object.entries(value2).forEach(([key3, value3]) => {
          (
            (this.planAlimenticio.controls['alimentos'] as FormGroup).controls[key] as FormGroup
          ).addControl(
            key3,
            this.FB.control(
              '',
              value3.validators.map(function (validator) {
                if ('params' in validator) {
                  return (Validators as any)[validator.type](validator.params);
                } else {
                  return (Validators as any)[validator.type];
                }
              })
            )
          );
        });
      });
    });
}
    
  AgregarPlanDieta(){
    const planDieta: PlanificacionDieta ={
      requerimiento_energetico: this.formPlanDieta.value.requerimiento_energetico,
      calorias_prescribir: this.formPlanDieta.value.calorias_prescribir,
      choc: this.formPlanDieta.value.choc,
      chon: this.formPlanDieta.value.chon,
      cooh:this.formPlanDieta.value.cooh,
      preescripcion_dieta: this.formPlanDieta.value.preescripcion_dieta
    };
  }

  passToFormGroup(form: string, sub_form:string = '') {
    if (sub_form === '') {
      return this.planAlimenticio.get(form) as FormGroup;
    }else{
      return (this.planAlimenticio.get(form) as FormGroup).get(sub_form) as FormGroup;
    } 
  }

  numInter( form: any){
    return (this.planAlimenticio.controls['alimentos'] as FormGroup).controls[form].value.n_int;
  }
}

