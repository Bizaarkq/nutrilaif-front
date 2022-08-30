import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-frecuencia-consumo',
  templateUrl: './frecuencia-consumo.component.html',
  styleUrls: ['./frecuencia-consumo.component.css']
})
export class FrecuenciaConsumoComponent {
  //formularioFrecuencia!: FormGroup;
  //Formulario a utilizar para la frecuencia de consumo
  @Input() formularioFrecuencia!: FormGroup;
  @Input() modoLectura:boolean = false;
  @Input() precargar:boolean=false;
  //Titulos utilizados en el componente de frecuencia de consumo
  titulos: string[] = ['Alimento', 'Frecuencia de consumo', 'Comentarios'];

  constructor( 
    private fb:FormBuilder,
    private generalService:GeneralService ) { }

  ngOnInit(): void {
    if(this.precargar){
      this.getBase();
    }
  }

  //Metodo get intermedio para obtener el FormArray de un FormGroup
  get frecuencias():FormArray{
    return this.formularioFrecuencia.get('frecuencia') as FormArray;
  }

  //Metodo encargado de crear un formGroup 
  newFrecuencia(alimento:any=null): FormGroup {
    return this.fb.group({
      alimento  : [alimento===null?'':alimento, Validators.required],
      frequencia: ['', Validators.required],
      comentario: ['', ]
    })
  }

  //Metodo para agregar un formGroup a el arreglo de frecuencias de consumo
  addFrecuencia(){
    this.frecuencias.push( this.newFrecuencia() );
  }
  
  //Metodo para eliminar un elemento del arreglo de frecuencias de consumo
  removeFrecuencia( i:number ){
    this.frecuencias.removeAt( i );
  }
  
  //Metodo para validar campos de la frecuencia de consumo
  validarCampos(){
    return (this.newFrecuencia().invalid) ? true : false;
  }
  getBase(){
    this.generalService.getBase().subscribe({
      next:(results:any)=>{
        const listaBase=results.map(function(alimento:any){
          return alimento.nombre;
        });
        listaBase.forEach((element:any) => {
          this.frecuencias.push(this.newFrecuencia(element));
        });
      },
    });
  }
}
