import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarClienteComponent } from './formulario-editar-cliente.component';

describe('FormularioEditarClienteComponent', () => {
  let component: FormularioEditarClienteComponent;
  let fixture: ComponentFixture<FormularioEditarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEditarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEditarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
