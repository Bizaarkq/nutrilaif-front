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

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formPliegues = this.fb.group({
      fecha         : ['', ],
      bicipital     : ['', ],
      tricipital    : ['', ],
      subEscapular  : ['', ],
      supraIliaco   : ['', ],
      abdominal     : ['', ],
      musloAnterior : ['', ],
      piernaMedial  : ['', ],
      brazoContraido: ['', ],
      cPierna       : ['', ],
      humero        : ['', ],
      femur         : ['', ],
      pesoActual    : ['', ],
      pliegues      : ['', ],
    })
  }

  
}
