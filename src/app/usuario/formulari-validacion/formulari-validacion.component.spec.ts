import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariValidacionComponent } from './formulari-validacion.component';

describe('FormulariValidacionComponent', () => {
  let component: FormulariValidacionComponent;
  let fixture: ComponentFixture<FormulariValidacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariValidacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
