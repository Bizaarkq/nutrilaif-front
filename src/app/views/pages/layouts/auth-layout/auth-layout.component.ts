import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  animations: [
    // animacion para rotar sol/luna
    trigger('rotacion', [
      state('light-theme', style({ transform: 'rotate(0)' })),
      state('dark-theme', style({ transform: 'rotate(-360deg)' })),
      transition('dark-theme => light-theme', animate('500ms ease-out')),
      transition('light-theme => dark-theme', animate('500ms ease-in')),
    ]),
  ],
})

export class AuthLayoutComponent implements OnInit {

  items: any = [];

  result:any;
  theme: string = 'light-theme';
  extenderTime: any;
  url_consulta:boolean =false;

  constructor(
    private generalService:GeneralService,
    private authService: AuthService,
    private router:Router,
    private dialog:MatDialog,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
      this.temaPorDefecto();
  }

  temaPorDefecto(){
    const body = document.getElementsByTagName('body')[0];
    if(localStorage.getItem('theme')){
      this.theme = localStorage.getItem('theme') as string;
      body.classList.add(this.theme);
    }else{
      localStorage.setItem('theme', this.theme);
      body.classList.add(this.theme);
    }
    
  }

  cambiarTema(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.theme);
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    body.classList.add(this.theme);
    localStorage.setItem('theme', this.theme);
  }
}
