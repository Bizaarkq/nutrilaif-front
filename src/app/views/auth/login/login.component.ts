import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //form login
  formLogin!: FormGroup;

  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService
      .iniciarSesion(
        this.formLogin.value.username,
        this.formLogin.value.password
      )
      .subscribe(
        {
          next: res => {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);
            localStorage.setItem('expires_in', res.expires_in);
            localStorage.setItem('refresh_expires_in', res.refresh_expires_in);
            
            this.router.navigate(['/inicio']);
            console.log(res);
          },
          error: err =>{
            this.snack.open('Usuario o Contraseña incorrectos', 'Ok',{
              duration: 3000
            });
          }
        }
      );
  }

  validarCampos( campo:string ){
    return this.formLogin.controls[campo].errors && this.formLogin.controls[campo].touched;
  }
}
