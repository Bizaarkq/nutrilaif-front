import { Component, Input, IterableDiffers, OnInit } from '@angular/core';
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


  //  idDatos:any;
  //  @Input() consultaForm !: FormGroup;
//  @Input() loadFromParent : boolean = false;
  // accion:any;
  //loadingDataEdicion: boolean = false;
 // estados:any;
 // estadoActual:any;
 //  row:any;
 //  numeroExpediente: any = null;
 // permitirGuardado: boolean = true;
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
  //  this.idDatos = this.route.snapshot.paramMap.get('numero_exp');
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

  updateExp(){
    const change ={
      nombre: 'Davi',
    }
    this.visibleSpinner = true;
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
          this.pacienteForm.reset();
        },
       error:(res)=>{
        this.visibleSpinner=false;
        this.snack.open(
          res.mensaje,
          'Error, creo',
          {
            duration: 5000,
          }
        );
       },
      })

    }
    //const idPaciente = this.pacienteChoosen.id_paciente;
    //this.pacienteService.update(this.id_paciente,change)
    //.subscribe(data=> {
    //  const prodFind = this.expediente.findIndex();
    //  console.log('actualizado',data);
    //})
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
    this.pacienteForm.controls['edad'].setValue(Math.floor((anioActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365)));
  }

  getExpediente(id: string){
    console.log()
  }

  onShowDetail(id:string){
    this.pacienteService.getDatos(id)
    .subscribe(data =>{
      console.log('paciente',data);
    })
  }

  }
