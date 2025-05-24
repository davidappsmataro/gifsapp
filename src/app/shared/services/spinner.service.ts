import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSub.asObservable();
  constructor() {}

  show() {
    this.loadingSub.next(true);
  }
  hide() {
    this.loadingSub.next(false);
  }
}
