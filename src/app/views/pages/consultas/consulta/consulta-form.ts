import { FormBuilder, FormGroup } from "@angular/forms";
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
          peso_actual: [''],
          peso_ideal: [''],
          p_grasa_corporal: [''],
          p_masa_muscular: [''],
          p_grasa_visceral: [''],
          peso_meta: [''],
          talla: [''],
          c_cintura: [''],
          imc: [''],
          edad_metabolica: [''],
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
          actividad_fisica: [''],
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
          peso_actual: [''],
          p_grasa_corporal: [''],
          p_masa_muscular: [''],
          p_grasa_visceral: [''],
          c_cintura: [''],
          imc: [''],
          edad_metabolica: [''],
          c_brazo_relaj: [''],
          c_cadera: [''],
          c_muneca: ['']
        });
        break;
      case "historia_dietetica":
          form = this.FB.group({
          agua: [''],
          actividad_fisica: [''],
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
      "diagnostico": {
        label: "Diagnostico",
        placeholder: "Diagnostico"
      },
      "medicamento_suplemento": {
        label: "Medicamento suplemento",
        placeholder: "Medicamento suplemento"
      },
      "otros_datos": {
        label: "Otros datos",
        placeholder: "Otros datos"
      },
      "hemoglobina": {
        label: "Hemoglobina",
        placeholder: "Hemoglobina"
      },
      "linfocitos": {
        label: "Linfocitos",
        placeholder: "Linfocitos"
      },
      "hba_1c": {
        label: "Hba 1c",
        placeholder: "Hba 1c"
      },
      "creatinina": {
        label: "Creatinina",
        placeholder: "Creatinina"
      },
      "trigliceridos": {
        label: "Trigliceridos",
        placeholder: "Trigliceridos"
      },
      "colesterol_total": {
        label: "Colterol Total",
        placeholder: "Colterol Total"
      },
      "chdl":{
        label: "Chdl",
        placeholder: "Chdl"
      },
      "cldl":{
        label: "Cldl",
        placeholder: "Cldl"
      },
      "glucosa_ayuno": {
        label: "Glucosa ayuno",
        placeholder: "Glucosa ayuno"
      },
      "glucosa_post_pondrial": {
        label: "Glucosa post-pondrial",
        placeholder: "Glucosa post-pondrial"
      },
      "acido_urico": {
        label: "Acido urico",
        placeholder: "Acido urico"
      },
      "albumina": {
        label: "Albumina",
        placeholder: "Albumina"
      },
      "peso_actual": {
        label: "Peso actual",
        placeholder: "Peso actual"
      },
      "peso_ideal": {
        label: "Peso Ideal",
        placeholder: "Peso ideal"
      },
      "p_grasa_corporal": {
        label: "Peso grasa corporal",
        placeholder: "Peso grsasa corporal"
      },
      "p_masa_muscular": {
        label: "Peso masa muscular",
        placeholder: "Peso masa muscular"
      },
      "p_grasa_visceral": {
        label: "Peso grasa visceral",
        placeholder: "Peso grasa visceral"
      },
      "peso_meta": {
        label: "Peso meta",
        placeholder: "Peso meta"
      },
      "talla": {
        label: "Talla",
        placeholder: "Talla"
      },
      "c_cintura": {
        label: "Cintura",
        placeholder: "Cintura"
      },
      "imc": {
        label: "Imc",
        placeholder: "Imc"
      },
      "edad_metabolica": {
        label: "Edad Metabolica",
        placeholder: "Edad Metabolica"
      },
      "c_brazo_relaj": {
        label: "Cintura"
      },
      "c_cadera": {
        label: "Cadera",
        placeholder: "Cadera"
      },
      "c_muneca": {
        label: "Muñeca",
        placeholder: "Muñeca"
      },
      "preferencia_alimen": {
        label: "Preferencia alimentaria",
        placeholder: "Preferencia alimentaria"
      },
      "alimentos_no_gustan": {
        label: "Alimentos que no gustan",
        placeholder: "Alimentos que no gustan"
      }, 
      "intolerancia_alergia": {
        label: "Intolerancia alergia",
        placeholder: "Intolerancia alergia"
      },
      "actividad_fisica": {
        label: "Actividad fisica",
        placeholder: "Actividad fisica"
      },
      "alcohol": {
        label: "Alcohol",
        placeholder: "Alcohol"
      },
      "tabaco": {
        label: "Tabaco",
        placeholder: "Tabaco"
      }
    }
  }


}
