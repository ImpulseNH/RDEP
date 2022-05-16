import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarRecintoComponent } from './formulario-agregar-recinto.component';

describe('FormularioAgregarRecintoComponent', () => {
  let component: FormularioAgregarRecintoComponent;
  let fixture: ComponentFixture<FormularioAgregarRecintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAgregarRecintoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAgregarRecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
