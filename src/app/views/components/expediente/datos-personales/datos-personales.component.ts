import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

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
    // this.formDatosPaciente = this.fb.group({
    //   numero_exp: ['', Validators.required],//Campo requerido
    //   nombre: ['', Validators.required],
    //   apellido: ['', Validators.required],
    //   fecha_nacimiento: ['', Validators.required],
    //   correo: ['', Validators.email],
    //   sexo: ['', Validators.required],
    //   telefono: ['',],
    //   direccion: ['',],

    //   //Los siguientes datos no estan en la base de datos
    //   departamento: ['', ],
    //   municipio: ['', ],
    //   edad: ['',],
    //   ocupacion: ['',],
    //   fechaExpediente: ['', Validators.required],
    // })
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const group:any = {};
    this.camposPacientes.forEach(property => group[property] = new FormControl());
    this.formDatosPaciente = new FormGroup(group);
  }

}
