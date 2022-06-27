import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, TodoTask } from './task.model';
import { getTasks } from './state/todo.selector';
import { addTask, deleteTask, loadTask, updateTask } from './state/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

}
