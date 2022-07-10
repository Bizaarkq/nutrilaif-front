import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { VirtualAction } from 'rxjs';
import { AlimentosService } from 'src/app/services/alimentos.service';

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
    this.pacienteForm=this.fb.group({
      numero_exp:[''],
      fechaExpediente:['',[Validators.required]],
      departamento:['',[Validators.required]],
      nombre:['',[Validators.required,
        Validators.pattern(/^([A-Za-zÁÉÍÓÚñáéíóúÑ0-9]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ0-9\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ0-9]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ0-9\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ0-9]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ0-9\'])?$/)]],
      fecha_nacimiento:['',[Validators.required]],
      municipio:['',[Validators.required]],
      edad:['',[Validators.required, Validators.min(0), Validators.max(130)]],
      telefono:['',[Validators.required, 
        Validators.pattern(/^[6-7]\d{3}-\d{4}$/)]],
      sexo:['',[Validators.required]],
      correo:['',[Validators.required,Validators.email,
        Validators.pattern(/.com$/)]]

    });
  }

  createForm(): void {
    const group:any = {};
    //this.camposPacientes.forEach(property => group[property] = new FormControl());
    this.camposPacientes.forEach(property => this.pacienteForm.addControl(property, new FormControl('')));
    console.log(this.pacienteForm);

    //this.formDatosPaciente = new FormGroup(group);
  }

}
