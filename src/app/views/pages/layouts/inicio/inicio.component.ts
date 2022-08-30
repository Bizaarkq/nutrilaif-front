import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
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

  tiles: Tile[] = [];
  visibleSpinner = false;
  constructor(private generalService:GeneralService) {}

  ngOnInit(): void {
    this.visibleSpinner=true;
    this.generalService.getMenu().subscribe({
      next: (data:any) => {
        data.map((item:any) => {
          this.tiles.push({
            text: item.label,
            subtitulo: item.sub_label,
            linkImagen: item.ruta_imagen,
            cols: item.cols,
            rows: item.rows,
            link: item.link,
            alt: item.alt
          });
        });
        this.visibleSpinner=false;
      },
      error: (err:any) => {
        this.visibleSpinner=false;
      }
    });
  }
}
