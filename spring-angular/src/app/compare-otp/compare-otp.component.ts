import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-compare-otp',
  templateUrl: './compare-otp.component.html',
  styleUrls: ['./compare-otp.component.css']
})
export class CompareOTPComponent {
  inputOTP!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.inputOTP = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  async compareOTP(inputOTP: any) {
    await this.authService.compareOTP(inputOTP.value.otp)
  }
}
