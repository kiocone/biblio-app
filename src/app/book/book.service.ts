import { Injectable } from '@angular/core';
import { IBook } from './book.interface';
import { staticBookList } from './book-list';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() {
  }

  getBooks(): IBook[] {
    staticBookList.forEach(book => {
      if (!book.coverImageUrl) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        book.coverImageUrl = `assets/portada${randomNumber}.png`; // Placeholder image for books without cover
      }
      if (!book.author) {
        book.author = ''; // Default value for missing author
      }
      if (!book.editorial) {
        book.editorial = ''; // Default value for missing editorial
      }
      if (!book.publishedYear) {
        book.publishedYear = ''; // Default value for missing published year
      }
      if (!book.language) {
        book.language = ''; // Default value for missing language
      }
      if (!book.description) {
        book.description = ''; // Default value for missing description
      }
      if (!book.genre) {
        book.genre = ''; // Default value for missing genre
      }
    });
    return staticBookList;
  }

  getBookById(id: number): IBook | undefined {
    return staticBookList.find(book => book.id === id);
  }
}
