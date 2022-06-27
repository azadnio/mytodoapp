import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../state/todo.actions';
import { AppState, TodoTask } from '../task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  postForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit(): void {

  }

  onAddPost() {

    if (!this.postForm.valid) {
      return;
    }

    const todoTask: TodoTask = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
      isActive: true
    };

    this.store.dispatch(addTask({ todoTask }));
  }

  get f() {
    return this.postForm.controls;
  }

}
