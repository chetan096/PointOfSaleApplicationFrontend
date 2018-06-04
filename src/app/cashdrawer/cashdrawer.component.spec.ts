import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdrawerComponent } from './cashdrawer.component';

describe('CashdrawerComponent', () => {
  let component: CashdrawerComponent;
  let fixture: ComponentFixture<CashdrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashdrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
