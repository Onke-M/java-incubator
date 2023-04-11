import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ViewUsersComponent } from './users-crud/view-users/view-users.component';
import { ViewBooksComponent } from './books-crud/view-books/view-books.component';
import { AuthGuard } from './services/auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
{path: 'book-catalog', component: BookCatalogComponent},

{path: '', component: LoginPageComponent},

{path: 'checkout', component: CheckoutPageComponent},

{path: 'cart', component: CartPageComponent, canActivate: [AuthGuard],
data: {
  role: 'Customer'
}},

{path: 'login', component: LoginPageComponent},

{path: 'register', component: RegisterPageComponent},

{path: 'users', component: ViewUsersComponent,canActivate: [AuthGuard],
data: {
  role: 'Admin'
}},

{path: 'books', component: ViewBooksComponent, canActivate: [AuthGuard],
data: {
  role: 'Admin'
}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
