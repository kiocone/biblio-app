import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookComponent } from './book/book';
import { FinderComponent } from './book/components/finder/finder.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BookComponent,
    FinderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'biblio-app';

  onSearch(event: string): void {
    // This method will handle the search query from the FinderComponent.
    console.log('Search query:', event);
    // You can implement further logic to handle the search, such as filtering books.
  }
}
