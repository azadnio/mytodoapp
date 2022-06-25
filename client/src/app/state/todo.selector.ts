import { todoTaskState } from './todo.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getTaskState = createFeatureSelector<todoTaskState>('tasks');

export const getTasks = createSelector(getTaskState, (state) => {
  return state.tasks;
});

export const getTasksOverview = createSelector(getTaskState, (state) => {

  let completed = state.tasks.filter(e => e.isActive).length;
  let pending = state.tasks.length - completed;

  return { completed, pending };
});
