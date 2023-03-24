import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BookCatalogService } from '../services/book-catalog.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {

books:any[] = [];
isLoading:boolean = false;

constructor(private httpClient: HttpClient, private bookCatalogService:BookCatalogService, private snackbarService:SnackbarService){}

async ngOnInit(){
await this.getBooks();
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


}
