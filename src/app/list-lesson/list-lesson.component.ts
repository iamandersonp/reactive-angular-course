import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'list-lesson',
  templateUrl: './list-lesson.component.html',
  styleUrls: ['./list-lesson.component.scss']
})
export class ListLessonComponent implements OnInit {
  @Input()
  lessons: Lesson[];
  constructor() {}

  ngOnInit(): void {}
}
