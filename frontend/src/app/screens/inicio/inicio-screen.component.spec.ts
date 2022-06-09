import { ComponentFixture, TestBed } from '@angular/core/testing';

import { inicioScreenComponent } from './inicio-screen.component';

describe('inicioScreenComponent', () => {
  let component: inicioScreenComponent;
  let fixture: ComponentFixture<inicioScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ inicioScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(inicioScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
