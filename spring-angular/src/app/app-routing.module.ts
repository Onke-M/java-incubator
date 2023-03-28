import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

const routes: Routes = [
{path: 'book-catalog', component: BookCatalogComponent},
{path: '', component: BookCatalogComponent},
{path: 'checkout', component: CheckoutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
