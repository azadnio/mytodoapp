
import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
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
      ofType(loadPosts),
      mergeMap((action) => {
        return this.todoService.getTasks().pipe(
          map((tasks: any) => {
            return loadPostsSuccess({ tasks });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.todoService.addTask(action.todoTask).pipe(
          map((data: any) => {
            const todoTask: TodoTask = {
              ...action.todoTask,
              id: data.id,
              time: data.time
            };
            return addPostSuccess({ todoTask });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.todoService.editTask(action.todoTask).pipe(
          map((data) => {
            return updatePostSuccess({ todoTask: action.todoTask });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.todoService.deleteTask(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
