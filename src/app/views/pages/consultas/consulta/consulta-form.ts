import { FormBuilder } from "@angular/forms";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class ConsultaForm{
  constructor(private FB: FormBuilder) { }

  primeraConsulta(option: string){
    let form;
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
        break;
    }
    return form;
  }

  consultaSubsecuente(){
    return this.FB.group({
      paciente: this.FB.group({}),
      datos_medicos: this.FB.group({
        diagnostico: [''],
        medicamento_suplemento: [''],
        otros_datos: ['']
      }),
      examen_labs: this.FB.group({
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
      }),
      datos_antropo: this.FB.group({
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
      }),
      historia_dietetica: this.FB.group({
        preferencia_alimen: [''],
        alimentos_no_gustan: [''],
        intolerancia_alergia: [''],
        actividad_fisica: [''],
        alcohol: [''],
        tabaco: [''],
      }),
      recordatorio: this.FB.group({}),
      frecuencia_consumo: this.FB.group({}),
      planificacion_dieta: this.FB.group({})
    });
  }

  mapeadoForm(){
    return {
      
    }
  }


}
