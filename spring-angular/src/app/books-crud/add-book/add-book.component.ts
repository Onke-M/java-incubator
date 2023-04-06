import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { lastValueFrom } from 'rxjs';
import { BookCatalogService } from 'src/app/services/book-catalog.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  addBook!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>, 
    public http: HttpClient, 
    public snackBarService: SnackbarService,
    public bookCatalogService: BookCatalogService
    ) { }

    async ngOnInit(){
      this.addBook = new FormGroup({
        bookName: new FormControl('', [Validators.required]),
        publicationDate: new FormControl('', [Validators.required]),
        version: new FormControl('', [Validators.required]),
        availableQuantity: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required])
      })
    }

    async confirmAdd() {
      if(this.addBook.valid){
        let book = {
          bookName: this.addBook.value.bookName,
          publicationDate: this.addBook.value.publicationDate,
          version: this.addBook.value.version,
          availableQuantity: this.addBook.value.availableQuantity,
          price: this.addBook.value.price
        }
        try{
          this.bookCatalogService.AddBook(book)
        }
        catch(error: any){
          if(error.status === 200){
            this.snackBarService.setMessage('The book was successfully added')
          }
          else{
            this.snackBarService.setMessage('There was an error adding the book')
          }
        }
        this.dialogRef.close();
      }
      else{
        this.snackBarService.setMessage('Please fill out all fields.')
      }
      
    }

    onNoClick(): void {
      this.snackBarService.setMessage('You chose not to add the book')
      this.dialogRef.close()
    }

}
