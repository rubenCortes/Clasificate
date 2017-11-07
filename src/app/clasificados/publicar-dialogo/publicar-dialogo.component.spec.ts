import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarDialogoComponent } from './publicar-dialogo.component';

describe('PublicarDialogoComponent', () => {
  let component: PublicarDialogoComponent;
  let fixture: ComponentFixture<PublicarDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicarDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
