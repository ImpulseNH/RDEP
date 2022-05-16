import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarServicioComponent } from './formulario-agregar-servicio.component';

describe('FormularioAgregarServicioComponent', () => {
  let component: FormularioAgregarServicioComponent;
  let fixture: ComponentFixture<FormularioAgregarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAgregarServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAgregarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
