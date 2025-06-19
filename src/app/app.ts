import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookComponent } from './book/book';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,BookComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'biblio-app';
}
