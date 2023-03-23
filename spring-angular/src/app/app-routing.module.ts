import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';

const routes: Routes = [
{path: 'book-catalog', component: BookCatalogComponent},
{path: '', component: BookCatalogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
