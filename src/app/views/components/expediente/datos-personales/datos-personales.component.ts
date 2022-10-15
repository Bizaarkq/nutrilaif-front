import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import formPaciente from './campos_form.json';
import { findIndex } from 'rxjs';
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() pacienteForm !: FormGroup;
  @Input() editable: boolean = true;
  @Input() expediente: boolean = false;
  @Output() edad = new EventEmitter<number>();
  paises: any;
  departamentos: any;
  municipios: any;
  visibleSpinner = false;
  fechaCreacion = new Date();
  id:any;
  id_paciente:string='';
  paciente: FormGroup = this.fb.group({});
  data:any;
  camposPacientes = formPaciente;

  //Formulario de datos de paciente
  //Variable para manejar el formulario de datos personales
  //formDatosPaciente!: FormGroup;
  //En el constructor se realiza la inyeccion del formulario reactivo a utilizar
  constructor(
    private fb: FormBuilder, 
    private pacienteService: DatosPersonalesService, 
    private generalService: GeneralService,
    private datePipe: DatePipe,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
    if(this.expediente){
      this.pacienteForm = this.fb.group({});
    }
    this.createForm();
    this.getPaises();

    const id_paciente = this.route.snapshot.paramMap.get('id_paciente');
    if( id_paciente !== null ){
      this.visibleSpinner=true;
      this.pacienteService.getDatosPersonales(id_paciente).subscribe({
        next: (results: any) => {
          
          if(results[0].municipio !== null && results[0].departamento !== null && results[0].pais !== null){
            this.getDepartamentos(results[0].pais);
            this.getMunicipios(results[0].departamento);
          }

          this.pacienteForm.patchValue(results[0]);
          this.visibleSpinner=false;
        },
        error: (err: any) => {
          this.visibleSpinner=false;
        }
      });
    }

  }

  createForm(): void {
    Object.entries(this.camposPacientes).forEach(([key, value]) => {
      this.pacienteForm.addControl(
        key,
        this.fb.control(
          { value: '', disabled: !this.editable },
          value.validators?.map(function (validator) {
            if (!validator.includes(':')) {
              return (Validators as any)[validator];
            } else {
              let parametros = validator.split(':');
              return (Validators as any)[parametros[0]](parametros[1]);
            }
          })
        )
      );
    });
    if(!this.expediente){
      this.pacienteForm.controls['fechaExpediente'].setValue(this.fechaCreacion);
    }
  }

  validarCampo( campo:string ){
    return this.pacienteForm.controls[campo].errors && 
      this.pacienteForm.controls[campo].touched;
  }

  getPaises(){
    this.generalService.getPaises().subscribe({
      next: (results: any) => {
        this.paises = results;
      }
    });
  }

  getDepartamentos(pais: any){
    this.pacienteForm.controls['departamento'].setValue(null);
    this.pacienteForm.controls['municipio'].setValue(null);
    this.generalService.getDepartamentos(pais).subscribe({
      next: (results: any) => {
        this.departamentos = results;
      },
    });
  }

  getMunicipios(departamento: any){
    this.pacienteForm.controls['municipio'].setValue(null);
    this.generalService.getMunicipios(departamento).subscribe({
      next: (results: any) => {
        this.municipios = results;
      }
    });
  }

  getEdad(fecha: any){
    const anioActual = new Date().getTime();
    let fechaNacimiento = new Date(fecha.value).getTime();
    let edadActual=Math.floor((anioActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365));
    this.pacienteForm.controls['edad'].setValue(edadActual);
    this.edad.emit(edadActual);
  }

  updateExp(){
    this.visibleSpinner = true;
    if(this.pacienteForm.valid){
      if(!this.pacienteForm.invalid){
        this.pacienteService.update(this.pacienteForm.getRawValue())
        .subscribe({
          next:(res)=>{
            this.visibleSpinner=false;
            this.snack.open(
              res.mensaje,
              'OK',
              {
                duration:5000,
              }
            );
          },
        error:(res)=>{
          this.visibleSpinner=false;
          this.snack.open(
            res.mensaje,
            'Error',
            {
              duration: 5000,
            }
          );
        },
        })
      }
    }else{
      this.visibleSpinner = false;
      this.snack.open(
        "Error al guardar, dato no valido",'Error',{
          duration:5000,
        }
      );
    }
  }
}
