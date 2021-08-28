import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(
    false
  );
  loading$: Observable<boolean> =
    this.loadingSubject.asObservable();

  constructor() {}

  ShowLoaderUntilCompleted<T>(
    obs$: Observable<T>
  ): Observable<T> {
    return undefined;
  }

  LoadingOn() {
    this.loadingSubject.next(true);
  }

  LoadingOff() {
    this.loadingSubject.next(false);
  }
}
