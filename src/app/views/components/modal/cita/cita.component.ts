import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  evento:any = JSON.parse(JSON.stringify(this.data));
  fechaCita: any;
  horaInicio: any;
  horaFin: any;
  hoy = new Date();
  nuevoPaciente:boolean = false;
  listadoPaciente: object[] = [];
  paciente = this.fb.control('', Validators.required);
  filteredPacientes: any;

  //flags
  pacienteSeleccionado:boolean = false;

  eventoForm: FormGroup = this.fb.group({
    titulo : ['', Validators.required],
    id : [null],
    id_paciente : [null],
    numero_exp : [null],
    nombre : ['', Validators.required],
    fecha_nacimiento : ['', Validators.required],
    edad : ['', Validators.required],
    objetivo : ['', Validators.required],
    telefono : ['', Validators.required],
    direccion : ['', Validators.required],
    correo : ['', Validators.required],
    fecha_cita_inicio : [''],
    fecha_cita_fin : ['']
  });

  constructor(
    private fb: FormBuilder,
    private pacienteService: DatosPersonalesService,
    private datepipe:DatePipe,
    public dialog: MatDialogRef<CitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.data.numero_exp ? this.nuevoPaciente = false : this.nuevoPaciente = true;
      this.eventoForm.patchValue(this.data);
      this.setFechaHora(this.data.fecha_cita_inicio, this.data.fecha_cita_fin);
    }else{
      this.getPacientes();
    }
  }

  concatenarFechas(){
    this.eventoForm.controls['fecha_cita_inicio'].patchValue(this.datepipe.transform(this.fechaCita, 'yyyy-MM-dd') + ' ' + this.horaInicio + ':00');
    this.eventoForm.controls['fecha_cita_fin'].patchValue(this.datepipe.transform(this.fechaCita, 'yyyy-MM-dd') + ' ' + this.horaFin + ':00');
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

  displayPaciente(paciente:any) : string {
    return paciente ? paciente.nombre + ' ' + paciente.apellido : '';
  }

  private _filter(value:any):any[] {
    const filterValue = value?.nombre ? value.nombre.toLowerCase() : value.toLowerCase();
    return this.listadoPaciente.filter((paciente:any) => paciente.nombre.toLowerCase().includes(filterValue) || paciente.apellido.toLowerCase().includes(filterValue) || paciente.numero_exp.toLowerCase().includes(filterValue));
  }

  setPacienteCita(paciente:any){
      console.log(this.paciente.value);
      this.eventoForm.controls['id_paciente'].patchValue(paciente.id);
      this.eventoForm.controls['numero_exp'].patchValue(paciente.numero_exp);
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
}
