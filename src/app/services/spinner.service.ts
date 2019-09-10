import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerSubject: BehaviorSubject<boolean>;
  castSpinner: Observable<any>;

  constructor() {
    this.spinnerSubject = new BehaviorSubject<boolean>(false);
    this.castSpinner = this.spinnerSubject.asObservable();

  }
  public get getSpinner(): boolean {
    return this.spinnerSubject.value;
  }

  showSpinner() {
    this.spinnerSubject.next(true);
  }
  hideSpinner() {
    this.spinnerSubject.next(false);
  }
}
