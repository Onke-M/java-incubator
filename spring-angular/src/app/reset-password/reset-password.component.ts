import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  public showPass: boolean = false;


  @ViewChild('password')
  public password!: ElementRef;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  async resetPassword(resetForm: any) {
    await this.authService.resetPassword(resetForm.value.password).then(() => {
          this.snackbar.setMessage('Password has been changed')
          this.snackbar.openSnackBar()
          this.router.navigate(['/login'])
    })
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
