import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

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
    return of(null).pipe(
      tap(() => this.LoadingOn()),
      concatMap(() => obs$),
      finalize(() => this.LoadingOff())
    );
  }

  LoadingOn() {
    this.loadingSubject.next(true);
  }

  LoadingOff() {
    this.loadingSubject.next(false);
  }
}
