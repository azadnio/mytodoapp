import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteTask, loadTask, updateTask } from '../state/todo.actions';
import { getTasks } from '../state/todo.selector';
import { AppState } from '../task.model';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit {

  tasks$: any = Observable;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
    this.store.dispatch(loadTask());
  }

  deleteTask(id: any) {

    this.store.dispatch(deleteTask({id}));
  }

  markAsDone(task: any) {

    this.store.dispatch(updateTask({todoTask: { ...task, isActive: false }}));
  }
}
