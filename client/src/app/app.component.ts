import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Task } from './tasks-state/task.entity';
import * as todoActions from './tasks-state/task.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isCreatingTask = false;
  isDeletingTask = false;

  task: Task;

  tasks: any = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store) {

    this.task = new Task();

    this.store.select(todoActions.getTasks).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data : any) => this.tasks = data.tasks);
  }
  // constructor(private todoService: ToDoService) {
  //   console.log('fetching API');
  //     this.todoService.getTasks().toPromise().then(d => this.tasks = d )
  // }

  createTask() {

    console.log('creating task')
  }

  deleteTask(id: any) {
    console.log('deleting task')
  }

  markAsDone(task: any) {

    console.log('done', task)
  }

}
