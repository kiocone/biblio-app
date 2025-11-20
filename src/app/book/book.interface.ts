export interface IBook {
  id: string;
  title: string;
  author: string | null;
  publishedYear: string | null;
  isbn: string;
  editorial: string | null;
  language: string | null;
  coverImageUrl: string | null;
  description: string | null;
  genre: string | null;
  availableCopies: number;
}