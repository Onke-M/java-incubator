import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  invalidLogin!: boolean;
  users: any = [];
  public showPass: boolean = false;
  isAdmin: any;
  isCustomer: any;
  loggedIn:any;

  @ViewChild('password')
  public password!: ElementRef;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.authService.isLogin.subscribe(l => this.loggedIn = l);
    this.authService.isAdmin.subscribe(a => this.isAdmin = a);
    this.authService.isCustomer.subscribe(c => this.isCustomer = c);
  }

  async loginUser(loginForm: any) {
    const credentials = {
      username: loginForm.value.email,
      password: loginForm.value.password
    }
    await this.authService.Login(credentials).then(() => {
      if(this.loggedIn){
        if(this.isCustomer){
          this.router.navigate(['/book-catalog'])
        }
        else{
          this.router.navigate(['/books'])
        }
      }
      else{
        this.snackbar.setMessage('Invalid credentials, please try again')
        this.snackbar.openSnackBar()
      }
    })
    console.log(credentials);
  }

  showHide() {
    let x = this.password.nativeElement;
    if (x.type === "password") {
      x.setAttribute('type', "text")
      this.showPass = false
    } else {
      x.setAttribute('type', "password")
      this.showPass = true
    }
  }
}



