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

@NgModule({
  declarations: [
    AppComponent,
    BookCatalogComponent,
    CartPageComponent,
    LoginPageComponent,
    CheckoutPageComponent,
    DeliveryCheckoutPageComponent,
    PaymentCheckoutPageComponent,
    OrderConfirmationPageComponent
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
