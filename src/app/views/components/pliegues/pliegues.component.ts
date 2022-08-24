import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pliegues',
  templateUrl: './pliegues.component.html',
  styleUrls: ['./pliegues.component.css']
})
export class PlieguesComponent implements OnInit {

  //Formulario para los pliegues
  formPliegues:any = FormGroup;
  //Fecha maxima
  fechaCreacion = new Date();

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formPliegues = this.fb.group({
      talla          : ['', ],
      fechaA         : ['', ],
      fechaB         : ['', ],
      fechaC         : ['', ],
      fechaD         : ['', ],
      fechaE         : ['', ],
      bicipitalA     : ['', ],
      bicipitalB     : ['', ],
      bicipitalC     : ['', ],
      bicipitalD     : ['', ],
      bicipitalE     : ['', ],
      tricipitalA    : ['', ],
      tricipitalB    : ['', ],
      tricipitalC    : ['', ],
      tricipitalD    : ['', ],
      tricipitalE    : ['', ],
      subEscapularA  : ['', ],
      subEscapularB  : ['', ],
      subEscapularC  : ['', ],
      subEscapularD  : ['', ],
      subEscapularE  : ['', ],
      supraIliacoA   : ['', ],
      supraIliacoB   : ['', ],
      supraIliacoC   : ['', ],
      supraIliacoD   : ['', ],
      supraIliacoE   : ['', ],
      abdominalA     : ['', ],
      abdominalB     : ['', ],
      abdominalC     : ['', ],
      abdominalD     : ['', ],
      abdominalE     : ['', ],
      musloAnteriorA : ['', ],
      musloAnteriorB : ['', ],
      musloAnteriorC : ['', ],
      musloAnteriorD : ['', ],
      musloAnteriorE : ['', ],
      piernaMedialA  : ['', ],
      piernaMedialB  : ['', ],
      piernaMedialC  : ['', ],
      piernaMedialD  : ['', ],
      piernaMedialE  : ['', ],
      brazoContraidoA: ['', ],
      brazoContraidoB: ['', ],
      brazoContraidoC: ['', ],
      brazoContraidoD: ['', ],
      brazoContraidoE: ['', ],
      cPiernaA       : ['', ],
      cPiernaB       : ['', ],
      cPiernaC       : ['', ],
      cPiernaD       : ['', ],
      cPiernaE       : ['', ],
      humeroA        : ['', ],
      humeroB        : ['', ],
      humeroC        : ['', ],
      humeroD        : ['', ],
      humeroE        : ['', ],
      femurA         : ['', ],
      femurB         : ['', ],
      femurC         : ['', ],
      femurD         : ['', ],
      femurE         : ['', ],
      pesoActualA    : ['', ],
      pesoActualB    : ['', ],
      pesoActualC    : ['', ],
      pesoActualD    : ['', ],
      pesoActualE    : ['', ],
      pliegues        : ['', ],
      porcentajeGrasa : ['', ],
      masaGrasaKg     : ['', ],
      masaGrasaLibras     : ['',]
    })
  }

  

  
}
