import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { ModalExtenderSesionComponent } from 'src/app/views/components/shared/modal-extender-sesion/modal-extender-sesion.component';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css'],
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
export class GeneralLayoutComponent implements OnInit, OnDestroy {

  items: any = [];

  result:any;
  theme: string = 'light-theme';
  extenderTime: any;

  constructor(
    private generalService:GeneralService,
    private authService: AuthService,
    private router:Router,
    private dialog:MatDialog,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.temaPorDefecto();
    if(localStorage.getItem('refresh_expires_in')) this.extenderSesion();

    this.generalService.getMenu().subscribe({
      next: (data:any) => {
        data.map((item:any) => {
          this.items.push({
            'label': item.label,
            'link': item.link
          });
        });
      },
      error: (err:any) => {}
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.extenderTime);
  }

  cerrarSesion(){
    this.authService.cerrarSesion().subscribe({
      next: () => {
        this.snack.open('Sesión finalizada con éxito', 'Ok',{
          duration: 3000
        });
      }, 
      error: () => {
        this.snack.open('Error al cerrar sesión', 'Ok',{
          duration: 3000
        });
      }
    });
    this.router.navigate(['auth/login']);
  }

  extenderSesion(){
    let refresh = Number(localStorage.getItem('refresh_expires_in'));
    this.extenderTime = setTimeout(() => {
        const dialog = this.dialog.open(ModalExtenderSesionComponent, {
          width: '30%',
          data: {
            titulo:'Extender Sesión',
            mensaje: 'Su sesión actual está a punto de finalizar. ¿Desea extender la sesión?',
            boton: 'Exender Sesión'
          }
        });
        dialog.afterClosed().subscribe(result => {
          if(result){
            this.authService.extenderSesion().subscribe({
              next: res => {
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('refresh_token', res.refresh_token);
                this.snack.open('Sesión extendida correctamente', 'Ok',{
                  duration: 3000
                });
              },
              error: err => {
                this.snack.open(
                  'No se logró completar la acción con éxito',
                  'Ok',
                  {
                    duration: 3000,
                  }
                );
              }
            })
            this.extenderSesion();
          }else{
            this.cerrarSesion();
          }
        })
    }, ((refresh - 60)*1000))
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
