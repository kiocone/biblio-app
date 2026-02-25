import { Component, inject, input, OnInit, resource, signal } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { IBook } from "../../book.interface";

@Component({
  selector: 'book-detail',
  template:`
  @if (bookDetail.hasValue()) {
    <div class="book-card">
      <div class="book-card-header">
        <img [src]="bookDetail.value().coverImageUrl" alt="{{ bookDetail.value().title }}" class="book-image" />
        <div class="book-details">
          <h3>{{ bookDetail.value().title }}</h3>
          <p><strong>Autor:</strong> {{ bookDetail.value().author }}</p>
          <p><strong>Año:</strong> {{ bookDetail.value().publishedYear }}</p>
          <p><strong>Editorial:</strong> {{ bookDetail.value().editorial }}</p>
          <p><strong>ISBN:</strong> {{ bookDetail.value().isbn }}</p>
          <p><strong>Idioma:</strong> {{ bookDetail.value().language }}</p>
          <p><strong>Género:</strong> {{ bookDetail.value().genre }}</p>
        </div>
      </div>
      <div class="book-card-description">
        <p>{{ bookDetail.value().description }}</p>
      </div>
      <button
        type="button"
        (click)="onBackButtonClicked()"
        class="back-button"
      >
        Volver
      </button>
    </div>
  } @else {
    <p>Detalles del libro no disponibles.</p>
  }  
  `,
  styleUrl: './book-detail.component.scss',
  standalone: true
})
export class BookDetailComponent implements OnInit {

  router = inject(Router);

  id = input<string>();

  loading = signal(false);


  bookDetail = resource<IBook, void>({
    loader: () => { 
      this.loading.set(true);
      const url = new URL(`${environment.apiUrl}/books/${this.id()}`);
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.loading.set(false);
        return response.json();
      })}
  });

  ngOnInit(): void {
  }

  onBackButtonClicked(): void {
    this.router.navigate(['/']);
  }
}