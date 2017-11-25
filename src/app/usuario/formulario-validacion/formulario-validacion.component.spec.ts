import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioValidacionComponent } from './formulario-validacion.component';

describe('FormularioValidacionComponent', () => {
  let component: FormularioValidacionComponent;
  let fixture: ComponentFixture<FormularioValidacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioValidacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
