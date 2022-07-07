import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() pacienteForm !: FormGroup;

  //Formulario de datos de paciente

  /*camposPacientes: string[] = [
    'numero_exp', 
    'nombre',
    'apellido',
    'fecha_nacimiento',
    'correo',
    'sexo',
    'telefono',
    'direccion',
    'departamento', 
    'municipio',
    'edad',
    'ocupacion',
    'fechaExpediente',
  ];*/
  //Variable para manejar el formulario de datos personales
  //formDatosPaciente!: FormGroup;
  //En el constructor se realiza la inyeccion del formulario reactivo a utilizar
  constructor(private fb: FormBuilder) { 
  }
  ngOnInit(): void {
    this.createForm();

    if(this.pacienteForm.get('id_paciente')?.value){
      
    }
  }

  createForm(): void {

    this.pacienteForm = this.fb.group({
      numero_exp        : ['', [Validators.required, Validators.minLength(6)]],
      nombre            : ['', [Validators.required, Validators.minLength(10)]],
      //El campo apellido solo esta en la base de datos pero aca no se esta usando
      apellido          : ['', [Validators.minLength(8)]],
      fecha_nacimiento  : ['', [Validators.required]],
      correo            : ['', [Validators.required, Validators.email]],
      sexo              : ['', [Validators.required]],
      telefono          : ['', [Validators.required, Validators.minLength(8)]],
      direccion         : ['', [Validators.required, Validators.minLength(5)]],
      departamento      : ['', [Validators.required]],
      municipio         : ['', [Validators.required]],
      edad              : ['', [Validators.required]],
      ocupacion         : [''],
      fechaExpediente   : ['', Validators.required]
    })

    const group:any = {};
    //this.camposPacientes.forEach(property => group[property] = new FormControl());
    //this.camposPacientes.forEach(property => this.pacienteForm.addControl(property, new FormControl('')));
    console.log(this.pacienteForm.value);

  }

}
