import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Task } from './tasks-state/task.entity';
import * as todoActions from './tasks-state/task.actions';
import { Store } from '@ngrx/store';
import { AppState } from './task.model';
import { getPosts } from './state/todo.selector';
import { addPost, deletePost, loadPosts, updatePost } from './state/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isCreatingTask = false;
  isDeletingTask = false;

  task: Task;

  tasks$: any = Observable;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>) {

    this.task = new Task();
  }
  ngOnInit(): void {

    this.tasks$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  createTask() {

    this.store.dispatch(addPost({todoTask: this.task}));
  }

  deleteTask(id: any) {

    this.store.dispatch(deletePost({id}));
  }

  markAsDone(task: any) {

    this.store.dispatch(updatePost({todoTask: { ...task, isActive: false }}));
  }

}
