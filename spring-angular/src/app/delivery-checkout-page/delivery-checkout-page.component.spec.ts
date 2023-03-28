import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCheckoutPageComponent } from './delivery-checkout-page.component';

describe('DeliveryCheckoutPageComponent', () => {
  let component: DeliveryCheckoutPageComponent;
  let fixture: ComponentFixture<DeliveryCheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCheckoutPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryCheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
