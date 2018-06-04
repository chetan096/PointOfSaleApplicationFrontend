import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page-component',
  templateUrl: './error-page-component.component.html',
  styleUrls: ['./error-page-component.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  home(){
    let employee=JSON.parse(window.sessionStorage.getItem('employee'));
    // if no employee in session navigate to home page
     if(employee==null){
       this.router.navigate(['']);
     }
     //else to home page
     else{
      this.router.navigate(['home'])
     }
     
  }
}
