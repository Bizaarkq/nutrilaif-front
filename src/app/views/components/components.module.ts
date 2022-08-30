import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Modulo encargado de almacenar todas las importaciones del angular material
import { SharedModule } from '../../shared/shared.module';

//Componentes
import { DatosPersonalesComponent } from './expediente/datos-personales/datos-personales.component';
import { FrecuenciaConsumoComponent } from './consulta/frecuencia-consumo/frecuencia-consumo.component';
import { ListarAlimentosComponent } from './listar-alimentos/listar-alimentos.component';
import { DialogAlimentoComponent } from './dialog-alimento/dialog-alimento.component';
import { RecordatorioComponent } from './consulta/recordatorio/recordatorio.component';
import { TablaDietaComponent } from './dieta/tabla-dieta/tabla-dieta.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PlanificacionDietaComponent } from './planificacion-dieta/planificacion-dieta.component';
import { ModalExtenderSesionComponent } from './shared/modal-extender-sesion/modal-extender-sesion.component';
import { CitaComponent } from './modal/cita/cita.component';
import { PlieguesComponent } from './pliegues/pliegues.component';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
    FrecuenciaConsumoComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent,
    RecordatorioComponent,
    TablaDietaComponent,
    SpinnerComponent,
    PlanificacionDietaComponent,
    ModalExtenderSesionComponent,
    PlieguesComponent,
    CitaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    DatosPersonalesComponent,
    FrecuenciaConsumoComponent,
    DatosPersonalesComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent,
    RecordatorioComponent,
    TablaDietaComponent,
    SpinnerComponent,
    PlanificacionDietaComponent,
    ModalExtenderSesionComponent,
    PlieguesComponent
  ]
})
export class ComponentsModule { }
