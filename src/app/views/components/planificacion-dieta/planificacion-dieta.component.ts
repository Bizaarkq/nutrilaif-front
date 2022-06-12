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
import {PlanificacionDieta} from 'src/app/interfaces/PlanificacionDieta'

@Component({
  selector: 'app-planificacion-dieta',
  templateUrl: './planificacion-dieta.component.html',
  styleUrls: ['./planificacion-dieta.component.css']
})
export class PlanificacionDietaComponent implements OnInit {

  @Input() planAlimenticio !: FormGroup;

  constructor(
    private authService: AuthService,
    private FB: FormBuilder,
    private router: Router,
    private snack: MatSnackBar
  ) { }

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

  formPlanDieta:FormGroup = this.FB.group({
    requerimiento_energetico:[''],
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
      'carnes_magras',
      'carnes_semi_grasas',
      'carnes_grasas',
      'grasas'
  ];

distribucionNutriente:FormGroup = this.FB.group({});
//on init

ngOnInit(): void {
 // this.planAlimenticio = this.FB.group({
    this.alimentos.forEach(nombre_alimento => this.distribucionNutriente.addControl(nombre_alimento, this.FB.control('')));
    this.planAlimenticio.addControl('distribucion_nutriente', this.distribucionNutriente);
    console.log(this.planAlimenticio);
//  });
}


  /*
  

  ngOnInit(): void {
    this.formPlanDieta = this.formBuilder.group({
      requerimiento_energetico:[''],
      calorias_prescribir:[''],
      choc:[''],
      chon:[''],
      cooh:[''],
      preescripcion_dieta:[''],
    });
  }*/

  

    
  AgregarPlanDieta(){
    console.log(this.formPlanDieta)

    const planDieta: PlanificacionDieta ={
      requerimiento_energetico: this.formPlanDieta.value.requerimiento_energetico,
      calorias_prescribir: this.formPlanDieta.value.calorias_prescribir,
      choc: this.formPlanDieta.value.choc,
      chon: this.formPlanDieta.value.chon,
      cooh:this.formPlanDieta.value.cooh,
      preescripcion_dieta: this.formPlanDieta.value.preescripcion_dieta
    }
    console.log(planDieta)
  }
    
 /*   planificacion_dieta(){
      this.authService
        .planificacion_dieta(
          this.formPlanDieta.value.requerimiento_energetico,
          this.formPlanDieta.value.calorias_preescribir,
          this.formPlanDieta.value.choc,
          this.formPlanDieta.value.chon,
          this.formPlanDieta.value.cooh,
          this.formPlanDieta.value.preescripcion_dieta,
        )
      )
    }*/

    send():any{
      console.log(this.formPlanDieta.value)
    }

  }

