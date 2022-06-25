import {
  deletePost,
  updatePost,
  loadPostsSuccess,
  addPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
} from './todo.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, todoTaskState } from './todo.state';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let task = { ...action.todoTask };

    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),

  on(updatePostSuccess, (state, action) => {
    const updatedTask = state.tasks.map((post) => {
      return action.todoTask.id === post.id ? action.todoTask : post;
    });

    return {
      ...state,
      tasks: updatedTask,
    };
  }),

  on(deletePostSuccess, (state, action) => {
    const updatedPosts = state.tasks.filter((post) => {
      return  post.id !==  +action.id;
    });

    return {
      ...state,
      tasks: updatedPosts,
    };
  }),

  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  })
);

export function postsReducer(state: todoTaskState | undefined, action: Action) {
  return _postsReducer(state, action);
}
