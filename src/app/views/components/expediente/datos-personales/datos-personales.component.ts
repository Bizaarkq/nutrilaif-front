import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() pacienteForm !: FormGroup;
  @Input() isSubsecuente : boolean = false;
  departamentos: any;
  municipios: any;
  visibleSpinner = false;
  fechaCreacion = new Date().getDate();
  //Formulario de datos de paciente

  camposPacientes = {
    "numero_exp": {
      "label": "Número de Expediente",
      "validators":  null,
    }, 
    'nombre': {
      "label": "Nombre",
      "validators":  [Validators.required, Validators.minLength(10)],
    },
    'apellido': {
      "label": "Apellido",
      "validators":  [Validators.required, Validators.minLength(8)],
    },
    'fecha_nacimiento': {
      "label": "Fecha de Nacimiento",
      "validators":  [Validators.required],
    },
    'correo': {
      "label": "Correo",
      "validators":  [Validators.required, Validators.email],
    },
    'sexo': {
      "label": "Sexo",
      "validators":  [Validators.required],
    },
    'telefono': {
      "label": "Teléfono",
      "validators":  [Validators.required, Validators.minLength(8)],
    },
    'direccion': {
      "label": "Dirección",
      "validators":  [Validators.required, Validators.minLength(5)],
    },
    'departamento': {
      "label": "Departamento",
      "validators":  [Validators.required],
    }, 
    'municipio': {
      "label": "Municipio",
      "validators":  [Validators.required],
    },
    'edad': {
      "label": "Edad",
      "validators":  null,
    },
    'ocupacion': {
      "label": "Ocupación",
      "validators":  [],
    },
    'fechaExpediente': {
      "label": "Fecha de Expediente",
      "validators":  null,
    },
  };
  //Variable para manejar el formulario de datos personales
  //formDatosPaciente!: FormGroup;
  //En el constructor se realiza la inyeccion del formulario reactivo a utilizar
  constructor(
    private fb: FormBuilder, 
    private pacienteService: DatosPersonalesService, 
    private generalService: GeneralService,
    private datePipe: DatePipe) { }

  ngOnInit(): void { 
    this.createForm();
    this.getDepartamentos();
    if(this.pacienteForm.get('id_paciente')?.value){
      this.visibleSpinner=true;
      this.pacienteService.getDatosPersonales(this.pacienteForm.get('id_paciente')?.value).subscribe({
        next: (results: any) => {
          this.pacienteForm.patchValue(results[0]);
          this.visibleSpinner=false;
        },
        error: (err: any) => {
          this.visibleSpinner=false;
        }
      });
    }

    if(this.isSubsecuente){
      this.pacienteForm.disable();
    }
  }

  createForm(): void {
    Object.entries(this.camposPacientes).forEach(([key, value]) => {
      this.pacienteForm.addControl(key, this.fb.control('', value.validators));
    });
    this.pacienteForm.controls['fechaExpediente'].setValue(this.fechaCreacion);
  }

  validarCampo( campo:string ){
    return this.pacienteForm.controls[campo].errors && 
      this.pacienteForm.controls[campo].touched;
  }

  getDepartamentos(){
    this.generalService.getDepartamentos().subscribe({
      next: (results: any) => {
        this.departamentos = results;
      },
    });
  }

  getMunicipios(departamento: any){
    this.generalService.getMunicipios(departamento).subscribe({
      next: (results: any) => {
        this.municipios = results;
      }
    });
  }

  getEdad(fecha: any){
    const anioActual = new Date().getTime();
    let fechaNacimiento = new Date(fecha.value).getTime();
    this.pacienteForm.controls['edad'].setValue(Math.floor((anioActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365)));
  }
  
}
