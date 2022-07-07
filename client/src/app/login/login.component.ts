import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  qrCode: string;
  loginSucces = false;
  errorMesssage = '';
  secret = "";


  constructor(private toDoService: ToDoService) {
    this.loginForm = new FormGroup({
      email: new FormControl("azadnio@gmail.com", [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl("azad12345", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.qrCode = '';
    this.loginSucces = false;

  }

  ngOnInit(): void {

  }

  onLogin() {

    if (!this.loginForm.valid) {
      return;
    }

    this.errorMesssage = "";
    this.loginSucces = false;

    this.toDoService.loginAuth2(this.loginForm.value.email, this.loginForm.value.password).subscribe((data:any) => {

      this.qrCode = data.img;
      this.secret = data.secret;

    }, (err) => {

      if (err.error.message)
        this.errorMesssage = err.error.message;

      else
        this.errorMesssage = err.message || "An error occured Please try again"
    })
  }

  submitCode(codeValue: any){

    this.errorMesssage = "";

    this.toDoService.validateAuth2(this.secret, codeValue).subscribe((data:any) => {

      this.loginSucces = true

    }, (err) => {

      if (err.error.message)
        this.errorMesssage = err.error.message;

      else
        this.errorMesssage = err.message || "An error occured Please try again"
    })
  }

  get f() {
    return this.loginForm.controls;
  }
}
