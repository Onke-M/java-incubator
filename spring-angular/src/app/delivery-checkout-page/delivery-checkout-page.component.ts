import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-delivery-checkout-page',
  templateUrl: './delivery-checkout-page.component.html',
  styleUrls: ['./delivery-checkout-page.component.css']
})
export class DeliveryCheckoutPageComponent {
  cartTotal:number = 0;
  selectedAddress:any;
  addresses:any[]=[
    {
      type:'Home',
      street:'20 Muller Street',
      suburb:'Buccleuch',
      city:'Johannesburg',
      code:'2191'
    },
    {
      type:'Work',
      street:'7 Melrose Boulevard',
      suburb:'Melrose Arch',
      city:'Johannesburg',
      code:'2076'
    },
    {
      type:'Other',
      street:'1080 Prospect Street',
      suburb:'Hatfield',
      city:'Pretoria',
      code:'0028'
    }
  ]

  constructor(private cartService: CartService){}

  async ngOnInit(){
    this.cartTotal = this.cartService.getCartTotal();
  }

  getAddress(address:any){
    this.selectedAddress = address;
    console.log(this.selectedAddress)
    this.cartService.setAddress(address)
  }

}
