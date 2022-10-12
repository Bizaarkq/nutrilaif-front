import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlieguesService } from '../../../services/pliegues.service';

@Component({
  selector: 'app-pliegues',
  templateUrl: './pliegues.component.html',
  styleUrls: ['./pliegues.component.css']
})
export class PlieguesComponent implements OnInit, OnChanges {

  //Formulario para los pliegues
  @Input() formPliegues!:FormGroup;
  //Obtener talla del paciente
  @Input() talla!:number;
  //Obtener peso actual del paciente
  @Input() pesoActual!:number;
  //Obtener sexo del paciente
  @Input() sexoPaciente!:string;
  //ID Paciente
  @Input() id:any;
  //ID de consulta
  @Input() idConsulta:any;
  pliegues = this.fb.group({});
  //Formulario para los datos extras
  formExtras:any = FormGroup;
  //Fecha maxima
  fechaCreacion = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
  //Variable para el numero de columnas
  numCols:any;
  //Arreglo de fechas
  fechaPliegues!:any [];

  variable:any;
  //Variables utilizadas para los pliegues
  porcentajeGrasa:number = 0;
  masaGrasaKg:number = 0;
  masaGrasaLb:number = 0;

  datosPliegue:any = [
    {name: 'p_bicipital', data: ['P. Bicipital (mm)']},
    {name: 'p_tricipital', data: ['P. Tricipital (mm)']},
    {name: 'p_sub_escapular', data: ['P. Sub-escapular (mm)']},
    {name: 'p_supra_iliaco', data: ['P. Supra-iliaco (mm)']},
    {name: 'p_abdominal', data: ['P. Abdominal (mm)']},
    {name: 'p_muslo_anterior', data: ['P. Muslo anterior (mm)']},
    {name: 'p_pierna_medial', data: ['P. pierna medial (mm)']},
    {name: 'c_brazo_contraido', data: ['C. Brazo contraído (cm)']},
    {name: 'c_pierna', data: ['C. Pierna (cm)']},
    {name: 'p_humero', data: ['P. Humero (cm)']},
    {name: 'p_femur', data: ['P. Fémur (cm)']},
  ];
  
  constructor(
    private fb:FormBuilder,
    private plieguesService:PlieguesService,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.formExtras = this.fb.group({
      talla     : ['', ],
      pliegues        : ['', ],
      porcentajeGrasa : ['', ],
      masaGrasaKg     : ['', ],
      masaGrasaLibras     : ['',]
    })
    this.createForm();
    (this.id)?this.getPliegues():this.numCols=2;
  }

  ngOnChanges(){
    if(this.sexoPaciente && this.pesoActual){
      this.calcularPliegues();
    }
    
  }

  getPliegues(){
    if(!(this.id===null)){
      this.plieguesService.getPliegues(this.id, this.idConsulta).subscribe({
        next: res => {
          this.numCols = res.length + 2;
          let auxiliar;
          this.datosPliegue.forEach((element:any)=>{
            this.fechaPliegues = res.map((e:any) =>{
              let date = this.datepipe.transform(new Date(e['fecha']), 'dd/MM/yyyy'); 
              return date;
            })
            auxiliar = res.map(function(e:any){
              return e[element.name];             
            })
            element.data = element.data.concat(auxiliar);   
          })
        },
        error: res =>{
  
        }
      })
    }
  }

  getDatosPliegues(llave:any):string[] {
    return this.datosPliegue[llave].data;
  }

  getNombreForm(key:any):string{
    return this.datosPliegue[key].name;
  }

  createForm(){
    this.datosPliegue.forEach((element:any)=>{
      this.formPliegues.addControl(element.name, this.fb.control(''));
    })
  }

  //Metodo para calcular los pliegues
  calcularPliegues(){
    let pG = 0, mGKg = 0, mGLb = 0;
    let pliegues = 0;
    //Calculo de los pliegues
    pliegues = this.getCampo('p_tricipital') + this.getCampo('p_sub_escapular') + this.getCampo('p_supra_iliaco') + 
                this.getCampo('p_abdominal') + this.getCampo('p_muslo_anterior') + this.getCampo('p_pierna_medial');
    
    //Calculos para mujeres
    if(this.sexoPaciente === 'M'){
      pG = 0.1548 * pliegues + 3.58;
      this.porcentajeGrasa = Number(pG.toFixed(3));
      mGKg = (this.porcentajeGrasa * this.pesoActual) / 100;
      this.masaGrasaKg = Number(mGKg.toFixed(3));
      mGLb = this.masaGrasaKg * 2.2
      this.masaGrasaLb = Number(mGLb.toFixed(3)); 
    }
    //Calculo para hombres
    if(this.sexoPaciente === 'H'){
      pG = 0.1051 * pliegues + 2.585;
      this.porcentajeGrasa = Number(pG.toFixed(3));
      mGKg = (this.porcentajeGrasa * this.pesoActual) / 100;
      this.masaGrasaKg = Number(mGKg.toFixed(3));
      mGLb = this.masaGrasaKg * 2.2;
      this.masaGrasaLb = Number(mGLb.toFixed(3)); 
    }
    return pliegues;
  }
  //Metodo intermedio para obtener el valor de un control del formulario de pliegues
  getCampo(campo : string){
    return Number(this.formPliegues.controls[campo].value);
  }
}
