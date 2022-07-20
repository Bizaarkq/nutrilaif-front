import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import formPaciente from './campos_form.json';
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() pacienteForm !: FormGroup;
  @Input() loadFromParent : boolean = false;
  @Input() editable: boolean = true;
  @Input() expediente: boolean = false;
  departamentos: any;
  municipios: any;
  visibleSpinner = false;
  fechaCreacion = new Date();
  //Formulario de datos de paciente

  camposPacientes = formPaciente;
  //Variable para manejar el formulario de datos personales
  //formDatosPaciente!: FormGroup;
  //En el constructor se realiza la inyeccion del formulario reactivo a utilizar
  constructor(
    private fb: FormBuilder, 
    private pacienteService: DatosPersonalesService, 
    private generalService: GeneralService,
    private datePipe: DatePipe,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
    if(this.expediente){
      this.pacienteForm = this.fb.group({});
    }
    this.createForm();
    this.getDepartamentos();

    const id_paciente = this.route.snapshot.paramMap.get('id_paciente');
    if( id_paciente !== null ){
      this.visibleSpinner=true;
      this.pacienteService.getDatosPersonales(id_paciente).subscribe({
        next: (results: any) => {
          
          if(results[0].municipio !== null && results[0].departamento !== null){
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
    console.log(this.pacienteForm);
    if(!this.expediente){
      this.pacienteForm.controls['fechaExpediente'].setValue(this.fechaCreacion);
    }
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
