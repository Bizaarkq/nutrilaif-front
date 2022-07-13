import { Component, OnInit } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  link: string;
  linkImagen: string;
  subtitulo: string;
  alt: string;
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
      subtitulo: 'Listado de expedientes',
      linkImagen: 'assets/images/expediente.jpeg',
      cols: 1,
      rows: 1,
      link: '/expediente/listar',
      alt: 'Expedientes de pacientes'
    },
    {
      text: 'Consulta',
      subtitulo: 'Listado de consultas',
      linkImagen: 'assets/images/consultaNutricionista.jpg',
      cols: 1,
      rows: 1,
      link: '/consulta/crear',
      alt: 'Listado de consultas'
    },
    {
      text: 'Catalogo',
      subtitulo: 'Catalogo de alimentos',
      linkImagen: 'assets/images/catalogoAlimentos.jpg',
      cols: 1,
      rows: 1,
      link: '/alimentos',
      alt: 'Listado de alimentos'
    },
    {
      text: 'Citas',
      subtitulo: 'Listado de citas',
      linkImagen: 'assets/images/calendarioCitas.webp',
      cols: 1,
      rows: 1,
      link: '/citas',
      alt: 'Listado de citas'
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
