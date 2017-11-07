import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadoPublicarComponent } from './clasificado-publicar.component';

describe('ClasificadoPublicarComponent', () => {
  let component: ClasificadoPublicarComponent;
  let fixture: ComponentFixture<ClasificadoPublicarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificadoPublicarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadoPublicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
