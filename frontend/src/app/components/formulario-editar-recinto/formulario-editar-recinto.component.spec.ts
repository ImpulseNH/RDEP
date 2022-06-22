import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarRecintoComponent } from './formulario-editar-recinto.component';

describe('FormularioEditarRecintoComponent', () => {
  let component: FormularioEditarRecintoComponent;
  let fixture: ComponentFixture<FormularioEditarRecintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEditarRecintoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEditarRecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
