import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

import { IEmployee } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  height: number = window.innerHeight;
  loginForm: FormGroup;
  employee: IEmployee;
  startBalance: string;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.createForm();
  }

  //if already employee present in the session navigate to home page
  ngOnInit() {
    if (window.sessionStorage.getItem("employee")) {
      this.router.navigate(['home'])
    }
  }
  //create form using form builder

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.maxLength(10)]]
    })
  }
  //authenticate user asking server to match the credentials
  authenticateUser() {
    let p: number = 0;
    if (this.loginForm.get('username').hasError('required') || this.loginForm.get('password').hasError('required')) {
      alert("Both fields are required")
      p = 1;
    }
    if (this.loginForm.get('username').hasError('maxlength')) {
      alert("User name cant be more than 8 characters")
      p = 1;
    }
    if (this.loginForm.get('password').hasError('maxlength')) {
      alert("Password cant be more than 10 characters");
      p = 1;
    }
    if (p != 1) {
      this.loginService.getEmployee(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe((data: any) => {
        this.employee = data;
        swal('Congrats!', 'You are successfully logged in', 'success');
        this.getCashDrawer();
      }, (error: string) => {
        if (error == undefined) {
          swal('Oops!', 'Backend server not started yet', 'error');
        }
        else {
          swal('Oops!', error, 'error');
        }
      })
    }

  }

  //get cash drawer if already login then dnt ask for entering start balance only ask if not yet login in whole day
  getCashDrawer() {
    this.loginService.getCashDrawer(this.employee.id).subscribe((data: any) => {
      if (data == null) {
        while (true) {
          let input: any = prompt("Please enter start balance", "0");
          if (!isNaN(input)) {
            input = parseInt(input);
            this.loginService.addStartBalance(input, this.employee.id).subscribe((data: any) => {
              swal('Congrats!', data.message, 'success');
            }, (error: string) => {
              swal('Oops!', error, 'error');
            }
            )
            break;
          }
        }

      }
      let employee: IEmployee = JSON.parse(window.sessionStorage.getItem('employees'));
      employee = this.employee;
      window.sessionStorage.setItem("employee", JSON.stringify(employee));
      this.router.navigate(['home']);
    }, (error: string) => {
      if (error == undefined) {
        swal('Oops!', 'Backend server not started yet', 'error');
      }
      else {
        swal('Oops!', error, 'error');
      }

    })
  }

}
