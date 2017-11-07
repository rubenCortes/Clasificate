import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTelefonoComponent } from './modificar-telefono.component';

describe('ModificarTelefonoComponent', () => {
  let component: ModificarTelefonoComponent;
  let fixture: ComponentFixture<ModificarTelefonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTelefonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
