import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadoFiltroComponent } from './clasificado-filtro.component';

describe('ClasificadoFiltroComponent', () => {
  let component: ClasificadoFiltroComponent;
  let fixture: ComponentFixture<ClasificadoFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificadoFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
