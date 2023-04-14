import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryCheckoutPageComponent } from './delivery-checkout-page/delivery-checkout-page.component';
import { PaymentCheckoutPageComponent } from './payment-checkout-page/payment-checkout-page.component';
import { OrderConfirmationPageComponent } from './order-confirmation-page/order-confirmation-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { EditBookComponent } from './books-crud/edit-book/edit-book.component';
import { AddBookComponent } from './books-crud/add-book/add-book.component';
import { ViewBooksComponent } from './books-crud/view-books/view-books.component';
import { ViewUsersComponent } from './users-crud/view-users/view-users.component';
import { AddUserComponent } from './users-crud/add-user/add-user.component';
import { GetOTPComponent } from './get-otp/get-otp.component';
import { CompareOTPComponent } from './compare-otp/compare-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    BookCatalogComponent,
    CartPageComponent,
    LoginPageComponent,
    CheckoutPageComponent,
    DeliveryCheckoutPageComponent,
    PaymentCheckoutPageComponent,
    OrderConfirmationPageComponent,
    RegisterPageComponent,
    EditBookComponent,
    AddBookComponent,
    ViewBooksComponent,
    ViewUsersComponent,
    AddUserComponent,
    GetOTPComponent,
    CompareOTPComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
