import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlimentosService } from 'src/app/services/alimentos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-alimento',
  templateUrl: './dialog-alimento.component.html',
  styleUrls: ['./dialog-alimento.component.css']
})
export class DialogAlimentoComponent implements OnInit {
  //Formulario para manejar el formulario de alimentos
  formDatosAlimento:any = FormGroup;
  camposAlimento: string[] = [
    'codigo',
    'nombre',
    'calorias',
    'grasas',
    'proteinas',
    'carbohidratos',
    'hierro',
    'potasio',
    'calcio',
    'sodio'
  ];
  
  ngOnInit(): void {
    //this.createForm();
    //Validar campos del formulario
    this.formDatosAlimento = this.fb.group({
      codigo: [{value:'', disabled:true}, Validators.required],
      nombre: ['', Validators.required],
      calorias: ['', Validators.required],
      grasas: ['', Validators.required],
      proteinas: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      hierro: ['', Validators.required],
      potasio: ['', Validators.required],
      calcio: ['', Validators.required],
      sodio: ['', Validators.required],
    })
    //Codigo para obtener los datos de un alimento seleccionado
    if(this.editData){
      this.actionBtn = 'Actualizar';
      this.formDatosAlimento.controls['codigo'].setValue(this.editData.codigo);
      this.formDatosAlimento.controls['nombre'].setValue(this.editData.nombre);
      this.formDatosAlimento.controls['calorias'].setValue(this.editData.calorias);
      this.formDatosAlimento.controls['grasas'].setValue(this.editData.grasas);
      this.formDatosAlimento.controls['proteinas'].setValue(this.editData.proteinas);
      this.formDatosAlimento.controls['carbohidratos'].setValue(this.editData.carbohidratos);
      this.formDatosAlimento.controls['hierro'].setValue(this.editData.hierro);
      this.formDatosAlimento.controls['potasio'].setValue(this.editData.potasio);
      this.formDatosAlimento.controls['calcio'].setValue(this.editData.calcio);
      this.formDatosAlimento.controls['sodio'].setValue(this.editData.sodio);
    }
  }
  
  actionBtn:string = 'Agregar';
  constructor(private fb: FormBuilder, 
    private api:AlimentosService,
    @Inject(MAT_DIALOG_DATA) public editData:any, //Para recibir datos enviados al hacer clic en el boton de editar del componente listar-alimentos
    private dialogRef:MatDialogRef<DialogAlimentoComponent>,
    
  ) {

  }

  // createForm(): void {
  //   const group:any = {};
  //   this.camposAlimento.forEach(property => group[property] = new FormControl());
  //   this.formDatosAlimento = new FormGroup(group); 
  // }

  addAlimento(){
    if(!this.editData){
      if(!this.formDatosAlimento.invalid){
          this.api.addAlimentos(this.formDatosAlimento.value)
          .subscribe({
            next:(res)=>{
              alert("Alimento agregado correctamente");
              this.formDatosAlimento.reset();
              this.dialogRef.close('guardar');
            },
            error:()=>{
              alert("Error al agregar alimento");
            }
          })
      }
    }else{
      this.editarAlimento();
    }
  }

  editarAlimento(){
    if(!this.formDatosAlimento.invalid){
      this.api.editarAlimentos(this.formDatosAlimento.getRawValue())
      .subscribe({
        next:(res)=>{
          alert("Alimento editado correctamente");
          this.formDatosAlimento.reset();
          this.dialogRef.close('actualizar');
        },
        error:()=>{
          alert("Error al editar un alimento");
        }
      })
    }
  }

}
