import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";
import { validateHorizontalPosition } from "@angular/cdk/overlay";
@Injectable({
  providedIn: 'root'
})
export class ConsultaForm{
  constructor(private FB: FormBuilder) { }

  primeraConsulta(option: string){
    let form: FormGroup;
    switch(option){
      case "datos_medicos":
          form = this.FB.group({
          diagnostico: ['',[Validators.required]],
          medicamento_suplemento: [''],
          otros_datos: ['']
        });
        break;
      case "examen_labs":
          form = this.FB.group({
          hemoglobina: [''],
          linfocitos: [''],
          hba_1c: [''],
          creatinina: [''],
          trigliceridos: [''],
          colesterol_total: [''],
          chdl: [''],
          cldl: [''],
          glucosa_ayuno: [''],
          glucosa_post_pondrial: [''],
          acido_urico: [''],
          albumina: ['']
        });
        break;
      case "datos_antropo":
          form = this.FB.group({
          peso_actual: ['',[Validators.required, Validators.min(0)]],
          peso_ideal: ['',[Validators.required, Validators.min(0)]],
          p_grasa_corporal: ['',[Validators.required, Validators.min(0)]],
          p_masa_muscular: ['',[Validators.required, Validators.min(0)]],
          p_grasa_visceral: ['',[Validators.required, Validators.min(0)]],
          peso_meta: ['',[Validators.required, Validators.min(0)]],
          talla: ['',[Validators.required, Validators.min(0)]],
          c_cintura: ['',[Validators.min(0)]],
          imc: ['',[Validators.required, Validators.min(0)]],
          edad_metabolica: ['',[Validators.min(0)]],
          c_brazo_relaj: ['',[Validators.min(0)]],
          c_cadera: ['',[Validators.min(0)]],
          c_muneca: ['',[Validators.min(0)]]
        });
        break;
      case "historia_dietetica":
          form = this.FB.group({
          preferencia_alimen: [''],
          alimentos_no_gustan: [''],
          intolerancia_alergia: [''],
          actividad_fisica: ['',[Validators.required]],
          alcohol: [''],
          tabaco: [''],
        });
        break;
      default:
        form = this.FB.group({});
        break;
    }
    return form;
  }

  subsecuente(option:string){
    let form: FormGroup;
    switch(option){
      case "datos_medicos":
          form = this.FB.group({
          diagnostico: [''],
          medicamento_suplemento: [''],
          otros_datos: ['']
        });
        break;
      case "examen_labs":
          form = this.FB.group({
          hemoglobina: [''],
          linfocitos: [''],
          hba_1c: [''],
          creatinina: [''],
          trigliceridos: [''],
          colesterol_total: [''],
          chdl: [''],
          cldl: [''],
          glucosa_ayuno: [''],
          glucosa_post_pondrial: [''],
          acido_urico: [''],
          albumina: ['']
        });
        break;
      case "datos_antropo":
          form = this.FB.group({
          peso_actual: ['',[Validators.required, Validators.min(0)]],
          p_grasa_corporal: ['',[Validators.required, Validators.min(0)]],
          p_masa_muscular: ['',[Validators.required, Validators.min(0)]],
          p_grasa_visceral: ['',[Validators.required, Validators.min(0)]],
          c_cintura: ['',[Validators.min(0)]],
          imc: ['',[Validators.required, Validators.min(0)]],
          edad_metabolica: ['',[Validators.min(0)]],
          c_brazo_relaj: ['',[Validators.min(0)]],
          c_cadera: ['',[Validators.min(0)]],
          c_muneca: ['',[Validators.min(0)]]
        });
        break;
      case "historia_dietetica":
          form = this.FB.group({
          agua: ['',[Validators.required]],
          actividad_fisica: ['',[Validators.required]],
          observacion_menu_anterior: ['',[Validators.required]],
          saciedad: ['',[Validators.required]],
          alimentos_quiere: [''],
          diagnostico_nutricional: ['',[Validators.required]],
        });
        break;
      default:
        form = this.FB.group({});
        break;
    }
    return form;
  }

  mapeadoForm(){
    return {
      
    }
  }


}
