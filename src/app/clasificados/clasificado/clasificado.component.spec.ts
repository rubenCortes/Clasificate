import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadoComponent } from './clasificado.component';

describe('ClasificadoComponent', () => {
  let component: ClasificadoComponent;
  let fixture: ComponentFixture<ClasificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
