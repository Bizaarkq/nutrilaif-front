import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent implements OnInit {

  items: any = [];


  constructor(private generalService:GeneralService) { }

  ngOnInit(): void {
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
}
