import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  
  //Variable para manejar el formulario de datos personales
  formDatosPaciente: FormGroup;
  //En el constructor se realiza la inyeccion del formulario reactivo a utilizar
  constructor(private fb: FormBuilder) { 
    this.formDatosPaciente = this.fb.group({
      numeroExpediente: ['', Validators.required],//Campo requerido
      nombrePaciente: ['', Validators.required],
      fechaExpediente: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      departamento: ['', ],
      municipio: ['', ],
      edad: ['',],//Campo no requerido
      telefono: ['',],
      ocupacion: ['',],
      correoElectronico: ['', Validators.email]
    })
  }
  ngOnInit(): void {
  }

  cargarDatos():void{
    
  }

  guardar():void{
    console.log(this.formDatosPaciente);
  }

}
