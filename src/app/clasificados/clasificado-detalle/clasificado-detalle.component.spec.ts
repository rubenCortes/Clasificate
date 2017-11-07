import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadoDetalleComponent } from './clasificado-detalle.component';

describe('ClasificadoDetalleComponent', () => {
  let component: ClasificadoDetalleComponent;
  let fixture: ComponentFixture<ClasificadoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificadoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
