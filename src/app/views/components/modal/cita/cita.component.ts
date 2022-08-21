import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { map, startWith } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { CitaService } from 'src/app/services/cita.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  fechaCita: any;
  horaInicio: any;
  horaFin: any;
  hoy = new Date();
  nuevoPaciente:boolean = false;
  listadoPaciente: object[] = [];
  paciente = this.fb.control('', Validators.required);
  filteredPacientes: any;
  nutric_aux: boolean = false;
  nutricionistas:any[] = [];

  infoPaciente = [
    'nombre',
    'fecha_nacimiento',
    'edad',
    'objetivo',
    'telefono',
    'direccion',
    'correo',
  ];


  eventoForm: FormGroup = this.fb.group({
    id : [null],
    id_nutric: [null],
    id_paciente : [null, Validators.required],
    titulo : ['', Validators.required],
    nombre : [''],
    fecha_nacimiento : [''],
    edad : [''],
    objetivo : [''],
    telefono : [''],
    direccion : [''],
    correo : [''],
    fecha_cita_inicio : ['', Validators.required],
    fecha_cita_fin : ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private pacienteService: DatosPersonalesService,
    private generalService: GeneralService,
    private datepipe:DatePipe,
    private citaService: CitaService,
    private snack: MatSnackBar,
    public dialog: MatDialogRef<CitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(this.data){
      if (this.data.id_paciente) {
        this.nuevoPaciente = false;
      }else{
        this.eventoForm.controls['id_paciente'].clearValidators();
        this.eventoForm.controls['id_paciente'].updateValueAndValidity();
        this.nuevoPaciente = true;
      }
      this.eventoForm.patchValue(this.data);
      this.paciente.patchValue(this.data);
      this.setFechaHora(this.data.fecha_cita_inicio, this.data.fecha_cita_fin);
    }
    this.getPacientes();
    this.getNutricionistas();
  }

  concatenarFechas(){
    if(this.fechaCita && this.horaInicio && this.horaFin){
    this.eventoForm.controls['fecha_cita_inicio'].patchValue(this.datepipe.transform(this.fechaCita, 'yyyy-MM-dd') + ' ' + this.horaInicio + ':00');
    this.eventoForm.controls['fecha_cita_fin'].patchValue(this.datepipe.transform(this.fechaCita, 'yyyy-MM-dd') + ' ' + this.horaFin + ':00');
    }
  }

  setFechaHora(fechaInicio:any, fechaFin:any){
    let fecha = fechaInicio.split(' ');
    this.fechaCita = fecha[0];
    this.horaInicio = fecha[1].substring(0,5);
    fecha = fechaFin.split(' ');
    this.horaFin = fecha[1].substring(0,5);
  }

  getPacientes(){
    this.pacienteService.getDatosPersonales().subscribe({
      next: (res) =>{
        this.listadoPaciente = res;
        this.filteredPacientes = this.paciente.valueChanges.pipe(
          startWith(''),
          map((paciente:any) => paciente ? this._filter(paciente) : this.listadoPaciente.slice())
        );
      },
      error: (err) =>{

      }
    });
  }

  getNutricionistas(){
    this.generalService.getNutricionistas().subscribe({
      next: (res) =>{
        this.nutricionistas = res;
      }
    });
  }

  displayPaciente(paciente:any) : string {
    return paciente ? paciente.nombre + ' ' + (paciente.apellido ? paciente.apellido : '') : '';
  }

  private _filter(value:any):any[] {
    const filterValue = value?.nombre ? value.nombre.toLowerCase() : value.toLowerCase();
    return this.listadoPaciente.filter((paciente:any) => paciente.nombre.toLowerCase().includes(filterValue) || paciente.apellido.toLowerCase().includes(filterValue) || paciente.numero_exp.toLowerCase().includes(filterValue));
  }

  setPacienteCita(paciente:any){
      this.eventoForm.controls['id_paciente'].patchValue(paciente.id);
  }

  validarCampo( campo:string ){
    return this.eventoForm.controls[campo].errors && 
      this.eventoForm.controls[campo].touched;
  }

  getEdad(fecha: any){
    const anioActual = new Date().getTime();
    let fechaNacimiento = new Date(fecha.value).getTime();
    this.eventoForm.controls['edad'].setValue(Math.floor((anioActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365)));
  }

  cambiarValidacion(){
      Object.entries(this.eventoForm.controls).forEach(([key, control]) => {
        if(this.infoPaciente.includes(key)) {
          this.nuevoPaciente ? control.setValidators(Validators.required) : control.clearValidators(); 
          control.updateValueAndValidity();
        }

        if(key === 'id_paciente'){ 
          control.setValue(null);
          this.paciente.setValue(null);
          this.nuevoPaciente ? control.clearValidators() : control.setValidators(Validators.required);
          control.updateValueAndValidity();
        } 

      });
  }

  nutricionistaAux(){
    this.nutric_aux = !this.nutric_aux;
    this.eventoForm.controls['id_nutric'].setValue(null);
    this.nutric_aux ? this.eventoForm.controls['id_nutric'].setValidators(Validators.required) : this.eventoForm.controls['id_nutric'].clearValidators();
    this.eventoForm.controls['id_nutric'].updateValueAndValidity();
  }

  guardarCita(){
    this.citaService.guardarCita(this.eventoForm.value).subscribe({
      next: (res) =>{
        this.snack.open(
          res.mensaje, 'Ok', 
          {
            duration: 3000,
          }
        );

        if(res.code === 200){
          this.eventoForm.controls['id'].setValue(res.data);
          this.dialog.close(this.eventoForm.value);
        }
      }
    });
  }
}
