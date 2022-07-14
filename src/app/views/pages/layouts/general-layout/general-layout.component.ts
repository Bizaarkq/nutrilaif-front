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
      'link': '/expedientes'
    },
    {
      'label': 'Consultas',
      'link': '/consulta/crear'
    },
    {
      'label': 'Catalogo',
      'link': '/alimentos'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
