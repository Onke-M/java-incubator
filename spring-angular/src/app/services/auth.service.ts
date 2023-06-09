import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';

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
otp!:string

  constructor(private httpClient: HttpClient, private snackbar:SnackbarService, private router: Router) { }

  async RegisterCustomer(registerUser:any): Promise<any> {
    console.log('API CALL')
    let httpCall = this.httpClient.post(`${API_URL}/users/registerCustomer`, registerUser)
    let response = await lastValueFrom(httpCall)
    return response
  }

  async getOTP(userEmail:string){
    let httpCall = this.httpClient.get<any>(`${API_URL}/token/getOTP?email=${userEmail}`)
    let response = await lastValueFrom(httpCall)
    this.otp = response;
    return response
  }

  async compareOTP(inputOtp:string){
    console.log(this.otp)
    console.log(inputOtp)
    let httpCall = this.httpClient.get<any>(`${API_URL}/token/compareOTP?otp=${inputOtp}`)
    let response = await lastValueFrom(httpCall)
    if(inputOtp == this.otp){
      this.router.navigate(['/reset-password']);
    }
    else{
      this.snackbar.setMessage("Invalid OTP, please try again")
      this.snackbar.openSnackBar()
    }
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

  async resetPassword(password:string){
    let httpCall = this.httpClient.put<any>(`${API_URL}/token/resetPassword`, password)
    await lastValueFrom(httpCall).then((res) => {
        this.snackbar.setMessage("Password has been reset")
        this.snackbar.openSnackBar()
    })
  }

  decodeToken(token: any) {
      var loggedInUser = jwt_decode(token)
      console.log(loggedInUser)
      return loggedInUser;
  }

  getRole(){
    if(localStorage.getItem('token')!=''){
      this.userDetails = this.decodeToken(localStorage.getItem('token'))
      this.role = this.userDetails.role
      if(this.role == 'Admin'){
        this.isAdmin.next(true)
      }
      else{
        this.isCustomer.next(true)
      }
      return this.role
    }
    else{
      return null;
    }
  }

  async logout(){
    localStorage.setItem('token', '');
    this.isLogin.next(false)
    this.isAdmin.next(false)
    this.isCustomer.next(false)
  }

  isLoggedIn(){
    if(localStorage.getItem('token')!=''){
      this.isLogin.next(true)
      return this.isLogin
    }
    else{
      this.isLogin.next(false)
      return this.isLogin
    }
  }
}
