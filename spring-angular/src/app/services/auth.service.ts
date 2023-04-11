import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
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
isLogin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
isAdmin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
isCustomer:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
        this.isLogin.next(true)
        this.getRole()
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
    if(this.role == 'Admin'){
      this.isAdmin.next(true)
    }
    else{
      this.isCustomer.next(true)
    }
    return this.role
  }

  async logout(){
    localStorage.clear();
    this.isLogin.next(false)
    this.isAdmin.next(false)
    this.isCustomer.next(false)
  }

  isLoggedIn(){
    if(localStorage.getItem('token')!=null){
      this.isLogin.next(true)
      return this.isLogin
    }
    else{
      this.isLogin.next(false)
      return this.isLogin
    }
  }
}
