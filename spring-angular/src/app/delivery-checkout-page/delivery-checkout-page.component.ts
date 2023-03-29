import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-delivery-checkout-page',
  templateUrl: './delivery-checkout-page.component.html',
  styleUrls: ['./delivery-checkout-page.component.css']
})
export class DeliveryCheckoutPageComponent {
  cartTotal:number = 0;

  constructor(private cartService: CartService){}

  async ngOnInit(){
    this.cartTotal = this.cartService.getCartTotal();
  }

}
