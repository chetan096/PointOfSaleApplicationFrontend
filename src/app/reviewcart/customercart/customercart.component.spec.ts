import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercartComponent } from './customercart.component';

describe('CustomercartComponent', () => {
  let component: CustomercartComponent;
  let fixture: ComponentFixture<CustomercartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
