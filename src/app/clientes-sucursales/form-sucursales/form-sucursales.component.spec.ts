import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSucursalesComponent } from './form-sucursales.component';

describe('FormSucursalesComponent', () => {
  let component: FormSucursalesComponent;
  let fixture: ComponentFixture<FormSucursalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSucursalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
