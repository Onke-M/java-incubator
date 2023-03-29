import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-confirmation-page',
  templateUrl: './order-confirmation-page.component.html',
  styleUrls: ['./order-confirmation-page.component.css']
})
export class OrderConfirmationPageComponent implements OnInit{
  cartTotal:number = 0;
  cart:any[]=[]
  address:any = {
    type:'Home',
    street:'20 Muller Street',
    suburb:'Buccleuch',
    city:'Johannesburg',
    code:'2191'
  }
  constructor(private cartService: CartService, private router: Router){}

  async ngOnInit(){
    this.cartTotal = this.cartService.getCartTotal();
    this.cart = this.cartService.getLocalCart()
        this.cartService.$address.subscribe(address => {
      this.address = address;
    });
    console.log(this.cart)
  }

  truncateChar(text: string): string {
    let charlimit = 50;
    if(!text || text.length <= charlimit )
    {
        return text;
    }
  
  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return shortened;
  }

  async checkout(){
    await this.cart.forEach(item => {
      this.cartService.Checkout(item)
    })
    this.router.navigate(['']);
  }
  
}

