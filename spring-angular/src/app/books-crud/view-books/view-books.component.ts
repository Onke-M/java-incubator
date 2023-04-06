import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BookCatalogService } from 'src/app/services/book-catalog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';

interface Book {
  bookID:number;
  bookName:string;
  publicationDate:string;
  bookVersion:number;
  availableQuantity:number;
  price:number
  }

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent {

isLoading:boolean = false;
books!:Book[];

constructor(private bookCatalogService: BookCatalogService, private snackbarService:SnackbarService, private dialog:MatDialog){}
displayedColumns: string[] = ['BookName', 'Price', 'AvailableQuantity', 'Actions'];
dataSource = new MatTableDataSource<Book>()

@ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit() {
    this.getBooks()
    this.dataSource.paginator = this.paginator;
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.bookCatalogService.GetBooks();
  }

  async deleteBook(book:any){
    await this.bookCatalogService.DeleteBook(book.bookID)
    this.snackbarService.setMessage(`${this.truncateChar(book.bookName)} has been deleted successfully`)
    this.snackbarService.openSnackBar()
  }

  async addBook() {

    this.dialog.open(AddBookComponent, {disableClose: true})
    .afterClosed().subscribe(async () => {
      this.snackbarService.openSnackBar(), await this.getBooks();
    });
  }

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getBooks() {
    console.log('Getting books')
    this.isLoading = true;
    await this.bookCatalogService.GetBooks().then(
      (res) => {
        this.books = res;
        this.dataSource.data = this.books;
      },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbarService.setMessage('Error getting books');
        }
      }
    ).finally(() => this.isLoading = false);
    console.log(this.books)
  }

  truncateChar(text: string): string {
    let charlimit = 10;
    if(!text || text.length <= charlimit )
    {
        return text;
    }
  
  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return shortened;
  }
}
