

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getTasks() {
    return this.http.get(this.rootURL + '/task');
  }

  addTask(task: any) {
    return this.http.post(this.rootURL + '/task', { task });
  }

  editTask(task: any) {
    return this.http.put(this.rootURL + '/task', { task });
  }

  deleteTask(taskId: any) {
    return this.http.delete(`${this.rootURL}/task/${taskId}`);
  }


  loginAuth2(email: any, password: any) {

    return this.http.post(this.rootURL + '/auth2/login', { email, password });
  }

  validateAuth2(secret: any, token: any) {

    return this.http.post(this.rootURL + '/auth2/validate-otp', { secret, token });
  }
}
