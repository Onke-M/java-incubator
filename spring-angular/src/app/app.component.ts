import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SnackbarService } from './services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-angular';

  constructor(public dialog: MatDialog, private snackBarService:SnackbarService, private router: Router){}

  openCart(){
    this.router.navigate(['/cart']);
  }

  logout(){
    localStorage.clear();
  }
}
