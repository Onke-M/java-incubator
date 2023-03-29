import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-confirmation-page',
  templateUrl: './order-confirmation-page.component.html',
  styleUrls: ['./order-confirmation-page.component.css']
})
export class OrderConfirmationPageComponent {
  cartTotal:number = 0;

  constructor(private cartService: CartService){}

  async ngOnInit(){
    this.cartTotal = this.cartService.getCartTotal();
  }
}
