import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlieguesService } from '../../../services/pliegues.service';

@Component({
  selector: 'app-pliegues',
  templateUrl: './pliegues.component.html',
  styleUrls: ['./pliegues.component.css']
})
export class PlieguesComponent implements OnInit {

  //Formulario para los pliegues
  @Input() formPliegues!:FormGroup;
  //Obtener talla del paciente
  @Input() talla:number = 0;
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
    {name: 'p_humero', data: ['P. Humero (cm']},
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
}
