import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./book/book').then(c => c.BookComponent),
  },
  {
    path: 'pageIndex/:pageIndex',
    loadComponent: () => import('./book/book').then(c => c.BookComponent),
  },
  {
    path: 'find/:findBook',
    loadComponent: () => import('./book/book').then(c => c.BookComponent),
  },
  {
    path: 'book/:id',
    loadComponent: () => import('./book/components/book-detail/book-detail.component').then(c => c.BookDetailComponent),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }