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
        label: "Diagnósticos médicos",
        placeholder: "Diagnóstico"
      },
      "medicamento_suplemento": {
        label: "Medicamento/Suplemento",
        placeholder: "Medicamento/suplemento"
      },
      "otros_datos": {
        label: "Otros datos importantes",
        placeholder: "Otros datos importantes"
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
        label: "HbA 1c",
        placeholder: "HbA 1c"
      },
      "creatinina": {
        label: "Creatinina",
        placeholder: "Creatinina"
      },
      "trigliceridos": {
        label: "Triglicéridos",
        placeholder: "Triglicéridos"
      },
      "colesterol_total": {
        label: "Colesterol Total",
        placeholder: "Colesterol Total"
      },
      "chdl":{
        label: "c-HDL",
        placeholder: "c-HDL"
      },
      "cldl":{
        label: "c-LDL",
        placeholder: "c-LDL"
      },
      "glucosa_ayuno": {
        label: "Glucosa en ayuno",
        placeholder: "Glucosa en ayuno"
      },
      "glucosa_post_pondrial": {
        label: "Glucosa post pondríal",
        placeholder: "Glucosa post pondríal"
      },
      "acido_urico": {
        label: "Ácido úrico",
        placeholder: "Ácido úrico"
      },
      "albumina": {
        label: "Albúmina",
        placeholder: "Albúmina"
      },
      "peso_actual": {
        label: "Peso actual",
        placeholder: "Peso actual"
      },
      "peso_ideal": {
        label: "Peso ideal",
        placeholder: "Peso ideal"
      },
      "p_grasa_corporal": {
        label: "Porcentaje grasa corporal",
        placeholder: "Porcentaje grsasa corporal"
      },
      "p_masa_muscular": {
        label: "Porcentaje masa muscular",
        placeholder: "Porcentaje masa muscular"
      },
      "p_grasa_visceral": {
        label: "Porcentaje grasa visceral",
        placeholder: "Porcentaje grasa visceral"
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
        label: "C. Cintura",
        placeholder: "C. Cintura"
      },
      "imc": {
        label: "Imc",
        placeholder: "Imc"
      },
      "edad_metabolica": {
        label: "Edad metabólica",
        placeholder: "Edad metabólica"
      },
      "c_brazo_relaj": {
        label: "C. Brazo relajado",
        placeholder: "C. Brazo relajado"
      },
      "c_cadera": {
        label: "C. Cadera",
        placeholder: "C. Cadera"
      },
      "c_muneca": {
        label: "C. Muñeca",
        placeholder: "C. Muñeca"
      },
      "preferencia_alimen": {
        label: "Preferencias alimentarias",
        placeholder: "Preferencias alimentarias"
      },
      "alimentos_no_gustan": {
        label: "Alimentos que no le gustan",
        placeholder: "Alimentos que no le gustan"
      }, 
      "intolerancia_alergia": {
        label: "Intolerancias o alergias",
        placeholder: "Intolerancias o alergias"
      },
      "actividad_fisica": {
        label: "Actividad física",
        placeholder: "Actividad física"
      },
      "alcohol": {
        label: "Alcohol",
        placeholder: "Alcohol"
      },
      "tabaco": {
        label: "Tabaquismo",
        placeholder: "Tabaquismo"
      }
    }
  }


}
