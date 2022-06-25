
import { createAction, props } from '@ngrx/store';
import { TodoTask } from '../task.model';

export const addPost = createAction('[todo page] add task', props<{ todoTask: TodoTask }>());
export const addPostSuccess = createAction(
  '[todo page] add task success',
  props<{ todoTask: TodoTask }>()
);

export const updatePost = createAction(
  '[todo page] update task',
  props<{ todoTask: TodoTask }>()
);

export const updatePostSuccess = createAction(
  '[todo page] update task success',
  props<{ todoTask: TodoTask }>()
);

export const deletePost = createAction(
  '[todo page] delete task',
  props<{ id: string }>()
);
export const deletePostSuccess = createAction(
  '[todo page] delete task',
  props<{ id: string }>()
);

export const loadPosts = createAction('[todo page] load tasks');
export const loadPostsSuccess = createAction(
  '[todo page] load task success',
  props<{ tasks: TodoTask[] }>()
);
