import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

const API_URL = environment.API_URL;



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  async RegisterCustomer(registerUser:any): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/users/registerCustomer`, registerUser)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async Login(credentials:any): Promise<any> {

    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/token/login`, credentials)
    let response = await lastValueFrom(httpCall)
    return response
  }
}
