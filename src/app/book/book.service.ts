import { Injectable } from '@angular/core';
import { IBook } from './book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList: IBook[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: '1925', isbn: '9780743273565', coverImageUrl: 'https://covers.openlibrary.org/b/id/9367463-L.jpg', description: 'A novel about the American dream.', genre: 'Fiction', availableCopies: 5 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: '1960', isbn: '9780061120084', coverImageUrl: 'https://covers.openlibrary.org/b/id/12606566-L.jpg', description: 'A novel about racial injustice.', genre: 'Fiction', availableCopies: 2 },
    { id: 3, title: '1984', author: 'George Orwell', publishedYear: '1949', isbn: '9780451524935', coverImageUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg', description: 'A dystopian novel about totalitarianism.', genre: 'Dystopian', availableCopies: 4 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: '1813', isbn: '9780141439518', coverImageUrl: 'https://covers.openlibrary.org/b/id/12604738-L.jpg', description: 'A romantic novel about manners.', genre: 'Romance', availableCopies: 3 },
    { id: 5, title: 'Moby-Dick', author: 'Herman Melville', publishedYear: '1851', isbn: '9781503280786', coverImageUrl: 'https://covers.openlibrary.org/b/id/3350964-L.jpg', description: 'A novel about obsession and revenge.', genre: 'Adventure', availableCopies: 1 }
  ];

  constructor() { }

  getBooks(): IBook[] {
    return this.bookList;
  }

  getBookById(id: number): IBook | undefined {
    return this.bookList.find(book => book.id === id);
  }
}
