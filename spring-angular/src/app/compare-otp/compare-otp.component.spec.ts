import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareOTPComponent } from './compare-otp.component';

describe('CompareOTPComponent', () => {
  let component: CompareOTPComponent;
  let fixture: ComponentFixture<CompareOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareOTPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
