import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-checkout-page',
  templateUrl: './payment-checkout-page.component.html',
  styleUrls: ['./payment-checkout-page.component.css']
})
export class PaymentCheckoutPageComponent {
  paymentDetails!: FormGroup;

  async ngOnInit(){

    this.paymentDetails = new FormGroup({
      cardNumber: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', [Validators.required]),
      cvvNumber: new FormControl('', [Validators.required])
    })
  }
}
