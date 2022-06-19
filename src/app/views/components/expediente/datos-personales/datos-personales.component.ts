import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() pacienteForm !: FormGroup;

  camposPacientes: string[] = [
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
  ];
  //Variable para manejar el formulario de datos personales
  formDatosPaciente!: FormGroup;
  //En el constructor se realiza la inyeccion del formulario reactivo a utilizar
  constructor(private fb: FormBuilder) { 
  }
  ngOnInit(): void {
    this.createForm();

    if(this.pacienteForm.get('id_paciente')?.value){
      
    }
  }

  createForm(): void {
    const group:any = {};
    //this.camposPacientes.forEach(property => group[property] = new FormControl());
    this.camposPacientes.forEach(property => this.pacienteForm.addControl(property, new FormControl('')));
    console.log(this.pacienteForm);

    //this.formDatosPaciente = new FormGroup(group);
  }

}
