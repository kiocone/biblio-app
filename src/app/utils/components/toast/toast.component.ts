import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [AsyncPipe],
  standalone: true
})
export class ToastComponent implements OnInit {

  private counterSubject = new BehaviorSubject<number | null>(null);
  counter$ = this.counterSubject.asObservable();

  showToast(message: number) {
    this.counterSubject.next(message);
    timer(message * 1000).subscribe(() => this.counterSubject.next(null));
  }

  constructor() {
  }
  // Toast component logic

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showToast(1);
  }
}