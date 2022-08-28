import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlieguesComponent } from './pliegues.component';

describe('PlieguesComponent', () => {
  let component: PlieguesComponent;
  let fixture: ComponentFixture<PlieguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlieguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlieguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
