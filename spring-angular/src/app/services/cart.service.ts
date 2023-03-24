import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

interface CartItem {
cartID:number;
bookID:number;
quantity:number
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[] = []

  constructor(private httpClient: HttpClient) { }

  async GetCart(): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.get(`${API_URL}/cart`)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async AddToCart(cartItem:any, userID:number): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/cart?userID=${userID}`, cartItem)
    let response = await lastValueFrom(httpCall)
    return response
  }
}
