import { TodoTask } from '../task.model';

export interface todoTaskState {
  tasks: TodoTask[];
}

export const initialState: todoTaskState = {
  tasks: [],
};
