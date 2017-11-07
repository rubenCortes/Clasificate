import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisClasificadosComponent } from './mis-clasificados.component';

describe('MisClasificadosComponent', () => {
  let component: MisClasificadosComponent;
  let fixture: ComponentFixture<MisClasificadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisClasificadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisClasificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
