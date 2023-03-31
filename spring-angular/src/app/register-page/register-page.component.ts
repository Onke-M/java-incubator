import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  registerForm!: FormGroup;
  invalidLogin!: boolean;
  users: any = [];
  public showPass: boolean = false;

  @ViewChild('password')
  public password!: ElementRef;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  async registerUser(registerForm: any) {
    const credentials = {
      username:registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      dateOfBirth: registerForm.value.dateOfBirth
    }
    // await this.authService.RegisterCustomer(credentials)
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
