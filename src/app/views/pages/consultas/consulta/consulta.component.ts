import { Component, OnInit, ElementRef, AfterContentChecked } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ConsultaService } from 'src/app/services/consulta.service';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import ConsultaGeneralForm from './forms/consulta-form-general.json';
import ConsultaGeneralSubSecuenteForm from './forms/consulta-form-general-sub.json';
import { MatDialog } from '@angular/material/dialog';
import { ModalExtenderSesionComponent } from 'src/app/views/components/shared/modal-extender-sesion/modal-extender-sesion.component';
import { deComponent } from 'src/app/services/deactivate.guard';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [MessageService]
})
export class ConsultaComponent implements OnInit, deComponent, AfterContentChecked {
  subConsulta: object = {};
  //Arreglo para algunos titulos mostrados en los step
  labelTitulos: string[] = ["Datos antropometricos", "Datos médicos", "Examenes de laboratorio", "Historia dietética" ];
  id: any;
  accion: any;
  esSubsecuente: boolean = false;
  visibleSpinner = false;
  subConsultaForm :FormGroup = this.FB.group({});
  id_paciente:any;
  loadingDataEdicion: boolean = false;
  numeroExpediente: any = null;
  edad:any;
  imcString:string='';
  estados:any;
  estadoActual:any;
  //flags
  redirigir: boolean = false;
  realizarValidacion: boolean = false;
  //Talla del paciente
  tallaPaciente!:number;
  //Peso actual del paciente
  pesoActual!:number;
  //Sexo del paciente
  sexo!:string;
  //Roles del usuario activo
  roles:any;
  paciente: FormGroup = this.FB.group({});
  recordatorio: FormGroup = this.FB.group({});
  frecuencia_consumo: FormGroup = this.FB.group({
    frecuencia: this.FB.array( [] )
  });
  planificacion_dieta: FormGroup = this.FB.group({});
  dieta: FormGroup = this.FB.group({});
  pliegues: FormGroup = this.FB.group({});

  consultaForm:FormGroup = this.FB.group({});

  constructor(
    private FB: FormBuilder,
    private consultaService: ConsultaService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private elRef:ElementRef,
    private generalService: GeneralService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerRoles(localStorage.getItem('rol'), ',');
    this.id = this.route.snapshot.paramMap.get('id_consulta');
    this.accion = this.route.snapshot.paramMap.get('accion');
    this.id_paciente = this.route.snapshot.paramMap.get('id_paciente');
    

    if(this.id_paciente) this.paciente.addControl('id_paciente', this.FB.control(this.id_paciente));

    if ((this.accion === 'editar' || this.accion === 'ver') && this.id !== null) {
      this.visibleSpinner = true;
      this.loadingDataEdicion = true;
      this.consultaService.getconsulta(this.id).subscribe({
        next: (data) => {
          this.tallaPaciente = data.subconsulta_form.datos_antropo.talla;
          this.pesoActual = data.subconsulta_form.datos_antropo.peso_actual;
          this.cargarEstados(data.estado);
          this.estadoActual = data.estado;
          if(data.es_subsecuente){
            this.subConsulta = ConsultaGeneralSubSecuenteForm;
          }else{
            this.subConsulta = ConsultaGeneralForm;
          }
          this.createSubForm();
          this.consultaForm.patchValue(data);
          
          this.loadFrecuenciaConsumo(data.frecuencia_consumo.frecuencia);
          
          if ( data.estado === 'ARCHIVADA' || this.accion === 'ver'){
            this.consultaForm.disable();
          };
        },
        error: (err) => {
          this.snack.open(
            'La información no pudo ser recuperada, intente nuevamente',
            'Ok',
            {
              duration: 3000,
            }
          );
        },
        complete: () => {
          this.loadingDataEdicion = false;
          this.visibleSpinner = false;
        }
      });
    } else if (this.accion == 'nueva') {
      this.cargarEstados();
      if(this.id_paciente){
        this.subConsulta = ConsultaGeneralSubSecuenteForm;
      }else{
        this.subConsulta = ConsultaGeneralForm;
      }
      this.createSubForm();
    }

    setTimeout(() => {
      this.elRef.nativeElement.querySelector('#talla').addEventListener('keyup', this.calcular.bind(this));
      this.elRef.nativeElement.querySelector('#peso_actual').addEventListener('keyup', this.calcular.bind(this));
    }, 5000); 
  }

  passToFormGroup(form: string) {
    return this.subConsultaForm.get(form) as FormGroup;
  }

  getControlSubConsulta(form:string){
    return this.subConsultaForm.controls[form] as FormControl;
  }

  log(val: any) {
    console.log(val);
  }
  
  guardar() {
    if(this.permitirGuardado()){
      this.visibleSpinner = true;
      this.consultaService.guardarConsulta(this.consultaForm.value, this.id).subscribe({
        next: (res) => {
          if(res.code === 99){
            this.snack.open(
              res.mensaje,
              '',
              {
                duration: 3000,
              }
            );
          }else{
            let duracion = 5000;
            if(res.data != null){
              this.snack.open(
                'N° de Expediente para el nuevo paciente: ' + res.data, '',
                {
                  duration: duracion/2,
                }
              );
              
              setTimeout(() => {
                 this.snack.open(res.mensaje, '', {
                   duration: duracion / 2,
                 });
              }, duracion/2);
              
            }else{
              this.snack.open(
                res.mensaje, '',
                {
                  duration: duracion,
                }
              );
            }
          
            this.paciente.controls['numero_exp'].setValue(res.data);
            this.numeroExpediente = res.data;
            if(this.accion==='nueva')this.redirigirCita();
            if(this.accion==='editar'){
              this.redirigir=true;
              setTimeout(()=>{
                this.router.navigate(['/expedientes']);
              }, duracion);
            }
          }
        },
        error: (err) => {
          this.snack.open(
            err.mensaje,
            '',
            {
              duration: 3000,
            }
          );
        },
        complete: () => {
          this.visibleSpinner = false;
        }
      });
    }
  }

  createSubForm(){
      Object.entries(this.subConsulta).forEach(([key, value]) => {
        this.subConsultaForm.addControl(value.step, this.FB.group({}));
        value.controls.forEach((control: any) => {
          (this.subConsultaForm.controls[value.step] as FormGroup).addControl(control.name, this.FB.control(
            '', 'validators' in control ?
            control.validators.map(function (validator : any) {
              if( 'params' in validator ){
                return (Validators as any)[validator['type']]((validator as any).params);
              }else{
                return (Validators as any)[validator.type];
              }
            }) : null
          ));
        });
      });
      //Agregar componente de pliegues solo cuando es un rol de nutri-deportista
      if(this.verificarRol()){
        this.subConsultaForm.addControl('pliegues', this.pliegues);
      }
      this.consultaForm = this.FB.group({
        paciente: this.paciente,
        recordatorio: this.recordatorio,
        frecuencia_consumo: this.frecuencia_consumo,
        dieta: this.dieta,
        planificacion_dieta: this.planificacion_dieta,
        subconsulta_form: this.subConsultaForm,
        estado: ''
      });
  }

  getValorDeControl(form:string, subform: string, control:string ){
    return ((this.consultaForm.controls[form] as FormGroup).controls[subform] as FormGroup).controls[control].value;
  }
  setValorControl(form:string, subform: string, control:string, valor:any){
    ((this.consultaForm.controls[form] as FormGroup).controls[subform] as FormGroup).controls[control].setValue(valor);
  }
  
  calcular(){
    let elevarTalla= this.getValorDeControl('subconsulta_form', 'datos_antropo', 'talla') ;
    elevarTalla*=elevarTalla;
    let mult = this.getValorDeControl('subconsulta_form', 'datos_antropo', 'peso_actual');
    
    //Variable utilizada para enviar el valor del peso actual al componente de pliegues
    this.pesoActual = this.getValorDeControl('subconsulta_form', 'datos_antropo', 'peso_actual');
    //Variable utilizada para enviar el valor de la talla al componente de pliegues
    this.tallaPaciente = this.getValorDeControl('subconsulta_form', 'datos_antropo', 'talla') ;
    
    let boolAnciano=this.getEdad();
    mult=mult/elevarTalla;
    this.setValorControl('subconsulta_form', 'datos_antropo', 'imc', mult);
    if(boolAnciano > 60){
      this.imcString = 
      mult <= 23 ? "Desnutrición" : 
      mult <= 28 ? "Normal" : 
      mult <= 32 ? "Sobrepeso" : 
      "Obesidad";
    }
    else{
      this.imcString = 
      mult < 16 ? "Desnutrición severa" : 
      mult < 17 ? "Desnutrición moderada" : 
      mult < 18.55 ? "Desnutrición leve" : 
      mult < 25 ? "Normal" : 
      mult < 30 ? "Sobrepeso" : 
      mult < 35 ? "Obesidad grado I" : 
      mult < 40 ? "Obesidad grado II" : 
      mult < 50 ? "Obesidad grado mórbida" : 
      "Obesidad extrema";
    }
  }

  setEdad(edad:any){
    this.edad=edad;
  }

  getEdad(){
    return this.edad;    
  }

  cargarEstados(estadoActual: any = null){
    this.generalService.getEstados(estadoActual).subscribe({
      next: (data) => {
        this.estados = data;
      }
    });
  }

  validacionMessage(camposFormHijo:any){
    if ('incorrectos' in camposFormHijo.campos && camposFormHijo.campos.incorrectos.length) this.messageService.add({
        key:'validacionform', 
        severity:'error', 
        summary:`Campos incorrectos en ${camposFormHijo.form}`, 
        detail: camposFormHijo.campos.incorrectos.join('\n'),
        closable: false
      });

    if ('vacios' in camposFormHijo.campos && camposFormHijo.campos.vacios.length) this.messageService.add({
        key:'validacionform', 
        severity:'warn', 
        summary:`Campos vacios en ${camposFormHijo.form}`, 
        detail: camposFormHijo.campos.vacios.filter((e:any) => e !== '').join('\n'),
        closable: false
      });
  }

  permitirGuardado(){
    this.realizarValidacion = this.estadoActual === 'CONSULTA.FINALIZADA' ? 
      'estado' in this.consultaForm.controls &&
      !this.consultaForm.controls['estado'].value.includes('BORRADOR') &&
      !this.consultaForm.controls['estado'].value.includes('FINALIZADA')
    : ( 'estado' in this.consultaForm.controls && 
      !this.consultaForm.controls['estado'].value.includes('BORRADOR') &&
      this.consultaForm.touched && 
      this.consultaForm.controls['estado'].value !== '');
    return 'estado' in this.consultaForm.controls ? 
      this.consultaForm.controls['estado'].value.includes('BORRADOR') ? 
      true : this.consultaForm.valid && (this.estadoActual === 'CONSULTA.FINALIZADA' ? 
      this.consultaForm.controls['estado'].value.includes('ARCHIVADA') 
      : this.consultaForm.controls['estado'].value.includes('FINALIZADA'))
      : false;
  }

  async decisionDialog(){
    if(!this.consultaForm.touched || this.redirigir){
      return true;
    }
    const decision = await this.abrirDialog();
    return decision;
  }

  async abrirDialog(){
    const dialog = this.dialog.open(ModalExtenderSesionComponent, {
      width: '30%',
      data: {
        titulo:'¿Desea abandonar la página actual?',
        mensaje: 'Si abandonas la página actual perderás los datos registrados en la consulta.',
        boton: 'Confirmar'
      }
    });
    return dialog.afterClosed().toPromise()
    .then(result => {
      return Promise.resolve(result);
    });
  }

  redirigirCita(){
    const dialog = this.dialog.open(ModalExtenderSesionComponent, {
      width: '30%',
      data: {
        titulo:'Redirigir a cita',
        mensaje: '¿Desea agendar la próxima cita?',
        boton: 'Confirmar'
      }
    });
    return dialog.afterClosed().subscribe(result => {
      this.redirigir=true;
      if(result){
        this.router.navigate(['/citas'], { queryParams: { expediente: this.numeroExpediente} });
      }
      else{
        this.router.navigate(['/expedientes']);
      }
    });
  }

  obtenerRoles( elemento:any, separador:string){
    this.roles = elemento.split(separador);
  }

  verificarRol(){
    return (this.roles.includes('nutri-deportista'));
  }
  
  //Obtener sexo del paciente enviado desde un output definido en el componente de datos del paciente
  obtenerSexo(e:string){
    this.sexo = e;
  }
  loadFrecuenciaConsumo(frecuencias:any){
    (this.frecuencia_consumo.get('frecuencia') as FormArray).removeAt(0); 
    
    frecuencias.forEach((f:any) => (
      this.frecuencia_consumo.get('frecuencia') as FormArray).push(this.FB.group(
        {
          alimento  : [ f.alimento , Validators.required],
          frequencia: [ f.frequencia, Validators.required],
          comentario: [ f.comentario ]
        }
      ))
    );
  }

  verificarSubFormConsulta(estado:string){
    if(!estado.includes('BORRADOR')){
      Object.entries(this.subConsulta).forEach(([key,subform]) => {
        let incorrectos = subform.controls.filter((e:any) => 
          (this.subConsultaForm.controls[subform.step] as FormGroup).controls[e.name].invalid &&
          (this.subConsultaForm.controls[subform.step] as FormGroup).controls[e.name].touched
        )
        .map((e:any) => {
          return e.label;
        });
  
        let vacios = subform.controls.filter((e:any) => 
          (this.subConsultaForm.controls[subform.step] as FormGroup).controls[e.name].invalid &&
          !(this.subConsultaForm.controls[subform.step] as FormGroup).controls[e.name].touched
        )
        .map((e:any) => {
          return e.label;
        });
        
        if(incorrectos.length || vacios.length){
          this.validacionMessage({campos:{incorrectos, vacios}, form: subform.label_step});
        }  
      });
    }
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
  
  //Se requiere subformulario específico y luego el que lo contiene
  // campo (Datos_Antropo entre otros) y group (subconsultaForm) respectivamente
  validarCampo(campo:string, group:any){
    return (this.subConsultaForm.controls[group]as FormGroup).controls[campo].errors && 
            (this.subConsultaForm.controls[group]as FormGroup).controls[campo].touched
  }  
  
}
