import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service'; 

@Component({
  selector: 'app-modal-extender-sesion',
  templateUrl: './modal-extender-sesion.component.html',
  styleUrls: ['./modal-extender-sesion.component.css']
})
export class ModalExtenderSesionComponent implements OnInit {
  @Output() event:EventEmitter<any> = new EventEmitter();
  
  constructor(private authService: AuthService, 
    public dialog: MatDialogRef<ModalExtenderSesionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) { }

  ngOnInit(): void {
    
  }
}
