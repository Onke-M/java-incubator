import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

interface User {
userID:number;
username:string;
email:string;
password:string;
dateOfBirth:string;
role:any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[] = []

  constructor(private httpClient: HttpClient) { }

  async GetUsers(): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.get(`${API_URL}/users`)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async AddUser(user:any){
    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/users/registerAdmin`, user)
    let response = await lastValueFrom(httpCall)
    return response
  }
}
