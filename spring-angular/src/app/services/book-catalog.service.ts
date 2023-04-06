import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

interface Book {
bookID:number;
bookName:string;
publicationDate:string;
bookVersion:number;
availableQuantity:number;
price:number
}

@Injectable({
  providedIn: 'root'
})
export class BookCatalogService {

  books:Book[] = []

  constructor(private httpClient: HttpClient) { }

  async GetBooks(): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.get(`${API_URL}/books`)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async AddBook(book:any){
    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/books`, book)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async DeleteBook(bookID:number){
    console.log('API CALL')
    let httpCall = this.httpClient.delete(`${API_URL}/books?bookID=${bookID}`)
    let response = await lastValueFrom(httpCall)
    return response
  }
}
