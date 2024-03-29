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
import planAlimenticioForm from './plan-alimenticio.json';

@Component({
  selector: 'app-planificacion-dieta',
  templateUrl: './planificacion-dieta.component.html',
  styleUrls: ['./planificacion-dieta.component.css'],
})
export class PlanificacionDietaComponent implements OnInit {
  @Input() planAlimenticio!: FormGroup;
  //Variable para manejar el formulario de datos personales
  formPlanAlimenticio = planAlimenticioForm;

  constructor(
    private authService: AuthService,
    private FB: FormBuilder,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    Object.entries(this.formPlanAlimenticio.manejo_planificacion).forEach(
      ([key, value]) => {
        this.planAlimenticio.addControl(key, this.FB.group({}));
        Object.entries(value.controls).forEach(([key2, value2]) => {
          (this.planAlimenticio.controls[key] as FormGroup).addControl(
            value2.name,
            this.FB.control('')
          );
        });
      }
    );

    this.planAlimenticio.addControl('alimentos', this.FB.group({}));
    Object.entries(this.formPlanAlimenticio.tablas.alimentos).forEach(
      ([key, value]) => {
        (this.planAlimenticio.controls['alimentos'] as FormGroup).addControl(
          value.name,
          this.FB.group({})
        );
        Object.entries(this.formPlanAlimenticio.tablas.form_alimento).forEach(
          ([key2, value2]) => {
            Object.entries(value2).forEach(([key3, value3]) => {
              (
                (this.planAlimenticio.controls['alimentos'] as FormGroup)
                  .controls[value.name] as FormGroup
              ).addControl(
                value3.name,
                this.FB.control(
                  '',
                  value3.validators.map(function (validator) {
                    if ('params' in validator) {
                      return (Validators as any)[validator.type](
                        validator.params
                      );
                    } else {
                      return (Validators as any)[validator.type];
                    }
                  })
                )
              );
            });
          }
        );
      }
    );
  }

  passToFormGroup(form: string, sub_form: string = '') {
    if (sub_form === '') {
      return this.planAlimenticio.get(form) as FormGroup;
    } else {
      return (this.planAlimenticio.get(form) as FormGroup).get(
        sub_form
      ) as FormGroup;
    }
  }

  numInter(form: any) {
    return (this.planAlimenticio.controls['alimentos'] as FormGroup).controls[
      form
    ].value.n_int;
  }

  verificarNumeroIntMenu(form: any) :boolean {
    const numeroInt = this.numInter(form);
    if (numeroInt === null || numeroInt === '') return false;
    let total = 0;
    Object.entries(this.formPlanAlimenticio.tablas.form_alimento.controls_patron).forEach( element => {
      total += Number(this.planAlimenticio.controls['alimentos'].value[form][element[1].name]);
    });

    return !(numeroInt === total);
  }

  calcularTotal(campo: any): number {
    let total = 0;
    Object.entries(this.planAlimenticio.controls['alimentos'].value).forEach(([key, value]) => {
      total += Number((value as Array<any>)[campo]);
    });
    return total;
  }

  calcularMargenError(campo: any): number {
    let margen = 0;
    margen =
      this.calcularTotal(campo) -
      (campo === 'kcal'
        ? this.planAlimenticio.controls['planificacion_dieta'].value[
            'calorias_prescribir'
          ]
        : this.planAlimenticio.controls['planificacion_dieta'].value[
            campo + '_gr'
          ]);
    return margen;
  }

}
