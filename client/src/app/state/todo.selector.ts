import { todoTaskState } from './todo.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getPostsState = createFeatureSelector<todoTaskState>('tasks');

export const getPosts = createSelector(getPostsState, (state) => {
  return state.tasks;
});
