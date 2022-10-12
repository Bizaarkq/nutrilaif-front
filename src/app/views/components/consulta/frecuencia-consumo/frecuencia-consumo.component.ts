import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-frecuencia-consumo',
  templateUrl: './frecuencia-consumo.component.html',
  styleUrls: ['./frecuencia-consumo.component.css']
})
export class FrecuenciaConsumoComponent implements OnInit, OnChanges {
  //formularioFrecuencia!: FormGroup;
  //Formulario a utilizar para la frecuencia de consumo
  @Input() formularioFrecuencia!: FormGroup;
  @Input() modoLectura:boolean = false;
  @Input() precargar:boolean=false;
  @Input() realizarValidacion: boolean = false;
  @Output() validacionForm = new EventEmitter<Object>();
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

  ngOnChanges(): void {
    if(this.realizarValidacion){
      if(this.realizarValidacion){
        this.validacionForm.emit({ 
          'form': 'Frecuencia de Consumo', 
          'campos': this.validandoForm()
        });
      }
    }
  }

  //Metodo get intermedio para obtener el FormArray de un FormGroup
  get frecuencias():FormArray{
    return this.formularioFrecuencia.get('frecuencia') as FormArray;
  }

  //Metodo encargado de crear un formGroup 
  newFrecuencia(alimento:any = null): FormGroup {
    return this.fb.group({
      alimento  : [ alimento === null ? '' : alimento , Validators.required],
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
  validarCampos(campo:string, indice:any):boolean{
    return (this.frecuencias.controls.find((value, key)=>key===indice) as FormGroup).controls[campo].invalid;
  }

  getBase(){
    this.generalService.getBase().subscribe({
      next:(results:any)=>{
        const listaBase = results.map(function(alimento:any){
          return alimento.nombre;
        });
        listaBase.forEach((element:any) => {
          this.frecuencias.push(this.newFrecuencia(element));
        });
      },
    });
  }

  validandoForm():Object{
    let data:any = this.frecuencias.controls.filter((e) => 
        e.invalid||(e.value.frequencia === '' || e.value.frequencia === null)
    );
    let campos:any = {};

    campos.incorrectos = data
      .filter((e:any) => 
        !e.controls['frequencia'].touched && 
        e.controls['alimento'].valid
      )
      .map((e:any) => e.value.alimento);

    campos.vacios = data
      .filter((e:any) =>
        e.controls['alimento'].errors
      )
      .map((e:any) => 
        e.value.alimento
      );

    return campos;
  }
}
