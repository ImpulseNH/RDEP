import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarClienteComponent } from './formulario-agregar-cliente.component';

describe('FormularioAgregarClienteComponent', () => {
  let component: FormularioAgregarClienteComponent;
  let fixture: ComponentFixture<FormularioAgregarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAgregarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
