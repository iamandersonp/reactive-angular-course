import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import {
  interval,
  noop,
  Observable,
  of,
  throwError,
  timer
} from 'rxjs';
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap
} from 'rxjs/operators';
import { CourseStore } from '../services/course.store';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private courseStore: CourseStore) {}

  ngOnInit() {
    this.ReloadCourses();
  }

  ReloadCourses() {
    this.beginnerCourses$ =
      this.courseStore.FilterByCategory('BEGINNER');

    this.advancedCourses$ =
      this.courseStore.FilterByCategory('ADVANCED');
  }
}
