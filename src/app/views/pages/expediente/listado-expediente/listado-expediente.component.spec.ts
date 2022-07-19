import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoExpedienteComponent } from './listado-expediente.component';

describe('ListadoExpedienteComponent', () => {
  let component: ListadoExpedienteComponent;
  let fixture: ComponentFixture<ListadoExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
