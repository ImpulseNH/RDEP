import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarBloqueComponent } from './formulario-agregar-bloque.component';

describe('FormularioAgregarBloqueComponent', () => {
  let component: FormularioAgregarBloqueComponent;
  let fixture: ComponentFixture<FormularioAgregarBloqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAgregarBloqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAgregarBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
