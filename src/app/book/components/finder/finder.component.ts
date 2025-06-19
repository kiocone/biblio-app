import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'finder',
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss'
})
export class FinderComponent {
  // This component is responsible for finding books.
  // It will contain methods to search for books by title, author, or ISBN.

  @Output() searchEvent = new EventEmitter<string>();

  constructor() {
    // Initialization code can go here.
  }

  searchBooks(event: any): void {
    this.searchEvent.emit(event.target.value.trim());
  }
} 