import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDatosComponent } from './registro-datos.component';

describe('RegistroDatosComponent', () => {
  let component: RegistroDatosComponent;
  let fixture: ComponentFixture<RegistroDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
