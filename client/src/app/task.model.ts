import { todoTaskState } from "./state/todo.state";

export class TodoTask {

  title?: string;
  description?: string;
  id?: number;
  time?: Date;
  isActive?: Boolean;

  constructor(){}
}

export interface AppState {
  tasks: todoTaskState []
}
