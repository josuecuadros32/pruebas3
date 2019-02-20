import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewempleadoComponent } from './newempleado.component';

describe('NewempleadoComponent', () => {
  let component: NewempleadoComponent;
  let fixture: ComponentFixture<NewempleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewempleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
