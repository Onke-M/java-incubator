import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-angular';

  constructor(public dialog: MatDialog, private snackBarService:SnackbarService){}

  openCart(){
    this.dialog.open(CartPageComponent, {disableClose: true, height: '650px'});
  }

  logout(){
    localStorage.clear();
  }
}
