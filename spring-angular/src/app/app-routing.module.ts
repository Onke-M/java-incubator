import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ViewUsersComponent } from './users-crud/view-users/view-users.component';
import { ViewBooksComponent } from './books-crud/view-books/view-books.component';

const routes: Routes = [
{path: 'book-catalog', component: BookCatalogComponent},
{path: '', component: BookCatalogComponent},
{path: 'checkout', component: CheckoutPageComponent},
{path: 'login', component: LoginPageComponent},
{path: 'register', component: RegisterPageComponent},
{path: 'users', component: ViewUsersComponent},
{path: 'books', component: ViewBooksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
