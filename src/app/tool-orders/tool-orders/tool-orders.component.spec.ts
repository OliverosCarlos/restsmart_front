import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolOrdersComponent } from './tool-orders.component';

describe('ToolOrdersComponent', () => {
  let component: ToolOrdersComponent;
  let fixture: ComponentFixture<ToolOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
