import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SnackbarService } from './services/snackbar.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-angular';
  loggedIn: any;
  isAdmin: any;
  isCustomer: any;

  constructor(public dialog: MatDialog, private snackBarService:SnackbarService, public authService:AuthService){}

  ngOnInit() {
    this.authService.isLogin.subscribe(l => this.loggedIn = l);
    this.authService.isAdmin.subscribe(a => this.isAdmin = a);
    this.authService.isCustomer.subscribe(c => this.isCustomer = c);
    this.authService.isLoggedIn()
    this.authService.getRole()
    console.log(this.loggedIn)
    console.log(this.isAdmin)
    console.log(this.isCustomer)
  }

  openCart(){
    this.dialog.open(CartPageComponent, {disableClose: true, height: '650px'});
  }

  logout(){
    this.authService.logout()
  }
}
