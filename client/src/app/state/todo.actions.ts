
import { createAction, props } from '@ngrx/store';
import { TodoTask } from '../task.model';

export const ddTask = createAction('[todo page] add task', props<{ todoTask: TodoTask }>());
export const addTaskSuccess = createAction(
  '[todo page] add task success',
  props<{ todoTask: TodoTask }>()
);

export const updateTask = createAction(
  '[todo page] update task',
  props<{ todoTask: TodoTask }>()
);

export const updateTaskSuccess = createAction(
  '[todo page] update task success',
  props<{ todoTask: TodoTask }>()
);

export const deleteTask = createAction(
  '[todo page] delete task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[todo page] delete task',
  props<{ id: string }>()
);

export const loadTask = createAction('[todo page] load tasks');
export const loadTaskSuccess = createAction(
  '[todo page] load task success',
  props<{ tasks: TodoTask[] }>()
);
