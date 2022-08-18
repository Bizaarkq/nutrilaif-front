import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { ModalExtenderSesionComponent } from 'src/app/views/components/shared/modal-extender-sesion/modal-extender-sesion.component';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent implements OnInit {

  items: any = [];

  result:any;

  sesionActiva = true;

  constructor(
    private generalService:GeneralService,
    private authService: AuthService,
    private router:Router,
    private dialog:MatDialog,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.extenderSesion();

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

  cerrarSesion(){
    this.sesionActiva = false;
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
    setTimeout(() => {
      if(this.sesionActiva){
        
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
                localStorage.setItem('acces_token', res.access_token);
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
      }
    }, ((refresh - 60)*1000))
  }
}
