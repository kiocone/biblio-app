import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, Subject } from "rxjs";

@Component({
  selector: 'finder',
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss',
  imports: [ReactiveFormsModule],
  standalone: true
})
export class FinderComponent {

  searchForm = new FormGroup({
    searchQuery: new FormControl<string>('')
  });
  @Input() showBackButton: boolean = false;
  @Output() searchEvent = new EventEmitter<string>();
  @Output() backEvent = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.searchEvent.emit(query.trim());
    });
    this.cdr.detectChanges()
  }

  searchBooks(event: any): void {
    this.searchForm.controls.searchQuery.setValue(event.target.value);
    this.searchSubject.next(event.target.value);
    this.cdr.detectChanges()
  }

  resetSearch(): void {
    this.searchForm.controls.searchQuery.setValue('');
    this.searchEvent.emit(this.searchForm.controls.searchQuery.value!);
    this.cdr.detectChanges()
  }
  
  onBackButtonClicked(): void {
    this.backEvent.emit();
    this.showBackButton = false;
    this.cdr.detectChanges()
  }
}