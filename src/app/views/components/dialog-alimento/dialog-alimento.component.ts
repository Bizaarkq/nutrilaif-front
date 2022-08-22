import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlimentosService } from 'src/app/services/alimentos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-dialog-alimento',
  templateUrl: './dialog-alimento.component.html',
  styleUrls: ['./dialog-alimento.component.css']
})
export class DialogAlimentoComponent implements OnInit {
  //Formulario para manejar el formulario de alimentos
  visibleSpinner = false;
  paises: any;
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
  codigoDisabled:boolean = false;
  
  ngOnInit(): void {
    this.codigoDisabled = this.editData ? true : false;
    //this.createForm();
    //Validar campos del formulario
    this.formDatosAlimento = this.fb.group({
      codigo: [{value:'', disabled: this.codigoDisabled}, Validators.required],
      nombre: ['', [Validators.required]],
      calorias: ['', [Validators.required,Validators.min(0)]],
      grasas: ['', [Validators.required,Validators.min(0)]],
      proteinas: ['', [Validators.required,Validators.min(0)]],
      carbohidratos: ['', [Validators.required,Validators.min(0)]],
      hierro: ['', [Validators.required,Validators.min(0)]],
      potasio: ['', [Validators.required,Validators.min(0)]],
      calcio: ['', [Validators.required,Validators.min(0)]],
      sodio: ['', [Validators.required,Validators.min(0)]],
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
  constructor(private fb: FormBuilder, private snack: MatSnackBar,
    private api:AlimentosService,
    @Inject(MAT_DIALOG_DATA) public editData:any, //Para recibir datos enviados al hacer clic en el boton de editar del componente listar-alimentos
    private dialogRef:MatDialogRef<DialogAlimentoComponent>,
    private generalService: GeneralService,

  ) {

  }

  // createForm(): void {
  //   const group:any = {};
  //   this.camposAlimento.forEach(property => group[property] = new FormControl());
  //   this.formDatosAlimento = new FormGroup(group); 
  // }

  addAlimento(){
    this.visibleSpinner=true;
    if(!this.editData){
      if(!this.formDatosAlimento.invalid){
          this.api.addAlimentos(this.formDatosAlimento.value)
          .subscribe({
            next:(res)=>{
              this.visibleSpinner=false;
              this.snack.open(
                res.mensaje,
                'OK',
                {
                  duration: 3000,
                }
              );
              this.formDatosAlimento.reset();
              this.dialogRef.close('guardar');
            },
            error:(res)=>{
              this.visibleSpinner=false;
              this.snack.open(
                res.mensaje,
                'OK',
                {
                  duration: 3000,
                }
              );
            }
          })
      }
    }else{
      this.editarAlimento();
    }
  }

  editarAlimento(){
    this.visibleSpinner=true;
    if(!this.formDatosAlimento.invalid){
      this.api.editarAlimentos(this.formDatosAlimento.getRawValue())
      .subscribe({
        next:(res)=>{
          this.visibleSpinner=false;
          this.snack.open(
            res.mensaje,
            'OK',
            {
              duration: 3000,
            }
          );
          this.formDatosAlimento.reset();
          this.dialogRef.close('actualizar');
        },
        error:(res)=>{
          this.visibleSpinner=false;
          this.snack.open(
            res.mensaje,
            'OK',
            {
              duration: 3000,
            }
          );
          
        }
      })
    }
  }

  getPaises(){
    this.generalService.getPaises().subscribe({
      next: (results: any) => {
        this.paises = results;
      }
    });
  }

}
