import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() pacienteForm !: FormGroup;
  @Input() isSubsecuente : boolean = false;
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
  constructor(private fb: FormBuilder, private pacienteService: DatosPersonalesService) { }

  ngOnInit(): void { 
    this.createForm();

    if(this.pacienteForm.get('id_paciente')?.value){
      this.pacienteService.getDatosPersonales(this.pacienteForm.get('id_paciente')?.value).subscribe({
        next: (results: any) => {
          console.log(results);
          this.pacienteForm.patchValue(results[0]);
        },
        error: (err: any) => {}
      });
    }

    if(this.isSubsecuente){
      this.pacienteForm.disable();
    }
  }

  createForm(): void {

    this.pacienteForm = this.fb.group({
      id_paciente       : [this.pacienteForm.get('id_paciente')?.value ? this.pacienteForm.get('id_paciente')?.value : null],
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

  validarCampo( campo:string ){
    return this.pacienteForm.controls[campo].errors && 
      this.pacienteForm.controls[campo].touched;
  }
  
}
