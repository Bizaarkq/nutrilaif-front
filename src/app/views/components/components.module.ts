import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';



//Componentes
import { DatosPersonalesComponent } from './expediente/datos-personales/datos-personales.component';
import { ListarExpedientesComponent } from './expediente/listar-expedientes/listar-expedientes.component';
import { ListarAlimentosComponent } from './listar-alimentos/listar-alimentos.component';
import { DialogAlimentoComponent } from './dialog-alimento/dialog-alimento.component';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
    ListarExpedientesComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatGridListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule
  ],
  exports: [
    DatosPersonalesComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent
  ]
})
export class ComponentsModule { }
