import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";
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
          peso_actual: ['',[Validators.required]],
          peso_ideal: ['',[Validators.required]],
          p_grasa_corporal: ['',[Validators.required]],
          p_masa_muscular: ['',[Validators.required]],
          p_grasa_visceral: ['',[Validators.required]],
          peso_meta: ['',[Validators.required]],
          talla: [''],
          c_cintura: [''],
          imc: ['',[Validators.required]],
          edad_metabolica: ['',[Validators.required]],
          c_brazo_relaj: [''],
          c_cadera: [''],
          c_muneca: ['']
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
          peso_actual: ['',[Validators.required]],
          p_grasa_corporal: ['',[Validators.required]],
          p_masa_muscular: ['',[Validators.required]],
          p_grasa_visceral: ['',[Validators.required]],
          c_cintura: [''],
          imc: ['',[Validators.required]],
          edad_metabolica: [''],
          c_brazo_relaj: [''],
          c_cadera: [''],
          c_muneca: ['']
        });
        break;
      case "historia_dietetica":
          form = this.FB.group({
          agua: ['',[Validators.required]],
          actividad_fisica: ['',[Validators.required]],
          observacion_menu_anterior: [''],
          saciedad: [''],
          alimentos_quiere: [''],
          diagnostico_nutricional: [''],
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
