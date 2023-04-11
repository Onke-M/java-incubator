import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { SnackbarService } from './snackbar.service';

const API_URL = environment.API_URL;



@Injectable({
  providedIn: 'root'
})
export class AuthService {
response:any
isLogin:boolean = false
role!:string
userDetails:any

  constructor(private httpClient: HttpClient, private snackbar:SnackbarService) { }

  async RegisterCustomer(registerUser:any): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/users/registerCustomer`, registerUser)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async Login(credentials:any){
    

    console.log('API CALL')
    let httpCall = this.httpClient.post<any>(`${API_URL}/token/login`, credentials)
    await lastValueFrom(httpCall).then((res) => {
      if(res==null){
        this.snackbar.setMessage("Invalid login credentials, please try again")
      }
      else{
        localStorage.setItem('token', res.token)
        this.snackbar.setMessage("Login successful")
        this.userDetails = this.decodeToken(localStorage.getItem('token'))
        this.isLogin = true
      }
    }).finally(()=> {
      this.snackbar.openSnackBar()
    })
    
  }

  decodeToken(token: any) {
      var loggedInUser = jwt_decode(token)
      console.log(loggedInUser)
      return loggedInUser;
  }

  getRole(){
    this.role = this.userDetails.role
    return this.role
  }

  isLoggedIn(){
    return this.isLogin
  }
}
