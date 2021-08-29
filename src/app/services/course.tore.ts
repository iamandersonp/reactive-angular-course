import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  throwError
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  Course,
  sortCoursesBySeqNo
} from '../model/course';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseStore {
  private subject = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> =
    this.subject.asObservable();

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.LoadAllCourses();
  }

  private LoadAllCourses() {
    const courses$: Observable<Course[]> =
      this.coursesService.LoadAlCourses().pipe(
        map((courses) => courses.sort(sortCoursesBySeqNo)),
        catchError((err) => {
          const message = 'Could not load courses';
          this.messagesService.ShowErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap((courses) => this.subject.next(courses)),
        tap((courses) => console.log(courses))
      );
    this.loadingService
      .ShowLoaderUntilCompleted(courses$)
      .subscribe();
  }

  SaveCourse(
    courseId: string,
    changes: Partial<Course>
  ): Observable<any> {
    const courses: Course[] = this.subject.getValue();
    const index = courses.findIndex(
      (course) => (course.id = courseId)
    );
    const newCouse: Course = {
      ...courses[index],
      ...changes
    };

    const newCouses: Course[] = courses.slice(0);
    newCouses[index] = newCouse;

    this.subject.next(newCouses);

    return this.coursesService
      .SaveCourse(courseId, changes)
      .pipe(
        catchError((err) => {
          const message = 'Could not save course';
          this.messagesService.ShowErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );
  }

  FilterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category == category)
          .sort(sortCoursesBySeqNo)
      ),
      tap((courses) => console.log(courses))
    );
  }
}
