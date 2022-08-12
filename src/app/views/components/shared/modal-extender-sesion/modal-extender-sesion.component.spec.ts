import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExtenderSesionComponent } from './modal-extender-sesion.component';

describe('ModalExtenderSesionComponent', () => {
  let component: ModalExtenderSesionComponent;
  let fixture: ComponentFixture<ModalExtenderSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExtenderSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExtenderSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
