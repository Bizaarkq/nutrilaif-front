import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { map, startWith } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { CitaService } from 'src/app/services/cita.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalExtenderSesionComponent } from '../../shared/modal-extender-sesion/modal-extender-sesion.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  telefonoPaciente:any;

  eventoForm: FormGroup = this.fb.group({
    id : [null],
    id_nutric: [null],
    id_paciente : [null, Validators.required],
    titulo : ['', Validators.required],
    nombre : [''],
    fecha_nacimiento : [''],
    edad : [''],
    objetivo : [''],
    telefono : ['', Validators.pattern('[2|6-7]\\d{3}-\\d{4}')],
    direccion : [''],
    correo : ['', Validators.email],
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
    private modal: MatDialog,
    public dialog: MatDialogRef<CitaComponent>,
    private router:ActivatedRoute,
    private route:Router,
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

      if(this.data.id_nutric){
        this.nutric_aux = true;
        this.eventoForm.controls['id_nutric'].patchValue(this.data.id_nutric);
      } 

      this.eventoForm.patchValue(this.data);
      this.paciente.patchValue(this.data);
      this.setFechaHora(this.data.fecha_cita_inicio, this.data.fecha_cita_fin);
    }
    let numExp = this.router.snapshot.queryParamMap.get('expediente');
    this.getPacientes(numExp);
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

  getPacientes(numExp:any = null){
    this.pacienteService.getDatosPersonales(numExp).subscribe({
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
      this.eventoForm.controls['nombre'].patchValue(paciente.nombre_completo);
      this.telefonoPaciente = paciente.municipio < 263 ? '503'+paciente.telefono : paciente.telefono;
      this.telefonoPaciente = this.telefonoPaciente.replace(/[^\d]/g, '');
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
    this.paciente.setValue(null);
    this.eventoForm.controls['id_paciente'].setValue(null);
    if(this.nuevoPaciente){
      this.eventoForm.controls['id_paciente'].clearValidators();
      this.eventoForm.controls['id_paciente'].updateValueAndValidity();
      this.eventoForm.controls['nombre'].setValidators([Validators.required]);
      this.eventoForm.controls['nombre'].updateValueAndValidity();
    }else{
      this.eventoForm.controls['id_paciente'].setValidators([Validators.required]);
      this.eventoForm.controls['id_paciente'].updateValueAndValidity();
      this.eventoForm.controls['nombre'].clearValidators();
      this.eventoForm.controls['nombre'].updateValueAndValidity();
    }
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
            duration: 5000,
          }
        );

        if(res.code === 200){
          this.eventoForm.controls['id'].setValue(res.data);
          if(this.router.snapshot.queryParamMap.get('expediente')) this.route.navigate(['/citas']);
          const modal = this.modal.open(ModalExtenderSesionComponent, {
            width: '30%',
            data: {
              titulo:'¿Desea notificar al paciente?',
              mensaje: 'Se abrirá una ventana para enviar mensaje por WhatsApp al usuario',
              boton: 'Notificar'
            }
          });
          modal.afterClosed().subscribe((res) =>{
            if(res){
              this.enviarMensaje(this.telefonoPaciente);
            }
          });
          this.data ? this.dialog.close({...this.eventoForm.value, editar: true}) : this.dialog.close({...this.eventoForm.value, guardado: true});
        }
      }
    });
  }

  enviarMensaje(phone:any){
    let telefono = this.data ? 
      /[2|6-7]\d{3}-\d{4}/.test(this.data.telefono) ? 
      '503'+this.data.telefono : this.data.telefono 
      : phone;
    telefono = telefono.replace(/[^\d]/g, '');
    const nombre = this.eventoForm.controls['nombre'].value;
    const mensaje = `Hola ${nombre}, te informamos que tu cita ha sido agendada para el día ${this.datepipe.transform(this.fechaCita, 'dd/MM/yy') } de ${this.horaInicio} a ${this.horaFin}.`;
    const url = `https://api.whatsapp.com/send?phone=${telefono}?text=${mensaje}&lang=es&type=phone_number&app_absent=1`;
    window.open(url, '_blank');
  }

  eliminarCita(){
    const modal = this.modal.open(ModalExtenderSesionComponent, {
      width: '30%',
      data: {
        titulo:'¿Desea eliminar la cita?',
        mensaje: 'Esta acción no se puede revertir',
        boton: 'Eliminar cita'
      }
    });

    modal.afterClosed().subscribe(result => {
      if(result){
        this.citaService.eliminarCita(this.eventoForm.controls['id'].value).subscribe({
          next: (res) =>{
            this.snack.open(
              res.mensaje, 'Ok', 
              {
                duration: 3000,
              }
            );
            if(res.code === 200){
              this.dialog.close({eliminado: true});
            }
          },
          error: (err) =>{
            this.snack.open(
              err.mensaje, 'Ok', 
              {
                duration: 3000,
              }
            );
          }
        });
      }
    });

  }
}
