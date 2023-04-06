import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { lastValueFrom } from 'rxjs';
import { BookCatalogService } from 'src/app/services/book-catalog.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  editBook!: FormGroup;
  book:any;

  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>, 
    public http: HttpClient, 
    public snackBarService: SnackbarService,
    public bookCatalogService: BookCatalogService
    ) { }

    async ngOnInit(){
      this.book = await this.bookCatalogService.getMappedBook()
      this.editBook = new FormGroup({
        bookName: new FormControl(`${this.book.bookName}`, [Validators.required]),
        publicationDate: new FormControl(`${this.book.publicationDate}`, [Validators.required]),
        version: new FormControl(`${this.book.version}`, [Validators.required]),
        availableQuantity: new FormControl(`${this.book.availableQuantity}`, [Validators.required]),
        price: new FormControl(`${this.book.price}`, [Validators.required])
      })
    }

    async confirmAdd() {
      if(this.editBook.valid){
        let book = {
          bookID: this.book.bookID,
          bookName: this.editBook.value.bookName,
          publicationDate: this.editBook.value.publicationDate,
          version: this.editBook.value.version,
          availableQuantity: this.editBook.value.availableQuantity,
          price: this.editBook.value.price
        }
        try{
          this.bookCatalogService.UpdateBook(book)
        }
        catch(error: any){
          if(error.status === 200){
            this.snackBarService.setMessage('The book was successfully updated')
          }
          else{
            this.snackBarService.setMessage('There was an error updating the book')
          }
        }
        this.dialogRef.close();
      }
      else{
        this.snackBarService.setMessage('Please fill out all fields.')
      }
      
    }

    onNoClick(): void {
      this.snackBarService.setMessage('You chose not to update the book')
      this.dialogRef.close()
    }


}
