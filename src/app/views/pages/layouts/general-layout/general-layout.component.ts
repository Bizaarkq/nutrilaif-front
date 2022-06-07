import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent implements OnInit {

  items: any = [
    {
      'label': 'Expedientes',
      'link': '/expediente/listar'
    },
    {
      'label': 'Consultas',
      'link': '/consulta/listar'
    },
    {
      'label': 'Catalogo',
      'link': '/catalogo'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
