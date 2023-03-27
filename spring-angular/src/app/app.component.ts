import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPageComponent } from './cart-page/cart-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-angular';

  constructor(public dialog: MatDialog){}

  openCart(){
    this.dialog.open(CartPageComponent, {disableClose: true, height: '650px'})
  }
}
