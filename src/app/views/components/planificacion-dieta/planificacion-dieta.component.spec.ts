import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionDietaComponent } from './planificacion-dieta.component';

describe('PlanificacionDietaComponent', () => {
  let component: PlanificacionDietaComponent;
  let fixture: ComponentFixture<PlanificacionDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificacionDietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
