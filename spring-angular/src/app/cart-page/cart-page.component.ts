import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../services/snackbar.service';
import { CartService } from '../services/cart.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  isLoading:boolean = false;
  cart:any[] = [];
  userID:number = 0;
  cartTotal:number = 0;
  
  constructor(private httpClient: HttpClient, private snackbarService:SnackbarService, private cartService:CartService, public dialogRef: MatDialogRef<CartPageComponent>,private router: Router){}

  async ngOnInit(){
    this.userID = 3
    await this.getCart(this.userID);
    }

  async getCart(userID:number) {
    console.log('Getting cart')
    await this.cartService.GetCart(userID).then(
      (res) => {
        this.cart = res;
        this.cart.forEach(item => {
          this.cartTotal = this.cartTotal + (item.book.price * item.quantity)
        });
      },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbarService.setMessage('Error getting cart');
        }
      }
    ).finally(() => this.isLoading = false);
    console.log(this.cart)
  }

  async checkout(){
    // await this.cart.forEach(item => {
    //   this.cartService.Checkout(item)
    // })
    this.cartService.setCartAndTotal(this.cart, this.cartTotal)
    this.dialogRef.close();
    this.router.navigate(['/checkout']);
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

}
