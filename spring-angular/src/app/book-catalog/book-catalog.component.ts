import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BookCatalogService } from '../services/book-catalog.service';
import { SnackbarService } from '../services/snackbar.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {

books:any[] = [];
isLoading:boolean = false;
cartItem:any = null;
userID:number = 0;
user:any;
loggedIn:any;
isCustomer: any;

constructor(private httpClient: HttpClient,
   private bookCatalogService:BookCatalogService, 
   private snackbarService:SnackbarService, 
   private cartService:CartService,
   private authService:AuthService,
   private router: Router){}

async ngOnInit(){
await this.getBooks();
    this.authService.isCustomer.subscribe(c => this.isCustomer = c);
    this.authService.isLogin.subscribe(l => this.loggedIn = l);
console.log(`BOOK CATALOG: ${this.loggedIn}`);

this.user = this.authService.decodeToken(localStorage.getItem('token'))
this.userID = parseInt(this.user.jti)

}

async getBooks() {
  console.log('Getting books')
  this.isLoading = true;
  await this.bookCatalogService.GetBooks().then(
    (res) => {
      this.books = res;
    },
    (response: HttpErrorResponse) => {
      if (response.status == 500) {
        this.snackbarService.setMessage('Error getting books');
      }
    }
  ).finally(() => this.isLoading = false);
  console.log(this.books)
}

async addToCart(book:any){
  if(this.loggedIn){
    if(this.isCustomer){
      this.cartItem = {
        "cart": null,
        "book": book,
        "quantity": 1
        }
        await this.cartService.AddToCart(this.cartItem, this.userID)
        this.snackbarService.setMessage(`${book.bookName} added to cart`)
        this.snackbarService.openSnackBar()
    }
    else{
      this.snackbarService.setMessage('You are not a customer')
    this.snackbarService.openSnackBar()
    }
  }
  else{
    this.snackbarService.setMessage('You are not logged in')
    this.snackbarService.openSnackBar()
    this.router.navigate(['/login']);
  }
}

truncateChar(text: string): string {
  let charlimit = 20;
  if(!text || text.length <= charlimit )
  {
      return text;
  }

let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
let shortened = without_html.substring(0, charlimit) + "...";
return shortened;
}

}
