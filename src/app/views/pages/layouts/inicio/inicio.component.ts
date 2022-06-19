import { Component, OnInit } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  link: string;
  color: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  tiles: Tile[] = [
    {
      text: 'Expediente',
      cols: 3,
      rows: 1,
      link: '/expediente/listar',
      color: 'lightblue'
    },
    {
      text: 'Consulta',
      cols: 1,
      rows: 2,
      link: '/consulta/crear',
      color: 'lightgreen'
    },
    {
      text: 'Catalogo',
      cols: 1,
      rows: 1,
      link: '/alimentos',
      color:  'lightpink'
    },
    {
      text: 'Citas',
      cols: 2,
      rows: 1,
      link: '/citas',
      color: '#DDBDF1'
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
