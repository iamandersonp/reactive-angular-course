import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map, shareReplay } from 'rxjs/operators';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  LoadCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  LoadAllCourseLessons(
    courseId: number
  ): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>('/api/lessons', {
        params: {
          pageSize: '1000',
          courseId: courseId.toString()
        }
      })
      .pipe(
        map((lesson) => lesson['payload']),
        shareReplay()
      );
  }

  public LoadAlCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map((res) => res['payload']),
      shareReplay()
    );
  }

  public SaveCourse(
    courseId: string,
    changes: Partial<Course>
  ): Observable<any> {
    return this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  SearchLesson(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>('/api/lessons', {
        params: {
          filter: search,
          pageSize: '100'
        }
      })
      .pipe(
        map((lesson) => lesson['payload']),
        shareReplay()
      );
  }
}
