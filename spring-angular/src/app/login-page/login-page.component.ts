import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  @ViewChild('password')
  public password!: ElementRef;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async loginUser(loginForm: any) {
    const credentials = {
      email: loginForm.value.email,
      password: loginForm.value.password
    }

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



