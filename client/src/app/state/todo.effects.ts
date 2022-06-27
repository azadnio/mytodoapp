
import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  addTask,
  addTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  loadTask,
  loadTaskSuccess,
  updateTask,
  updateTaskSuccess,
} from './todo.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ToDoService } from '../todo.service';
import { TodoTask } from '../task.model';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private todoService: ToDoService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTask),
      mergeMap((action) => {
        return this.todoService.getTasks().pipe(
          map((tasks: any) => {
            return loadTaskSuccess({ tasks });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.todoService.addTask(action.todoTask).pipe(
          map((data: any) => {
            const todoTask: TodoTask = {
              ...action.todoTask,
              id: data.id,
              time: data.time
            };
            return addTaskSuccess({ todoTask });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      switchMap((action) => {
        return this.todoService.editTask(action.todoTask).pipe(
          map((data) => {
            return updateTaskSuccess({ todoTask: action.todoTask });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) => {
        return this.todoService.deleteTask(action.id).pipe(
          map((data) => {
            return deleteTaskSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
