import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.css']
})
export class GetOTPComponent {
  inputEmail!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.inputEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async getOTP(inputEmail: any) {
    await this.authService.getOTP(inputEmail.value.email).then(() => {
          this.router.navigate(['/compare-otp']);
        })
  }

}
