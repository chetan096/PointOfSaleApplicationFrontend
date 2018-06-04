import { Component, OnInit } from '@angular/core';
import { ICashDrawer, ITransaction } from '../../models/models';
import { CashdrawerService } from './cashdrawer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashdrawer',
  templateUrl: './cashdrawer.component.html',
  styleUrls: ['./cashdrawer.component.css']
})
export class CashdrawerComponent implements OnInit {

  //drawer entries in here
  drawers: ICashDrawer[];
  //drawer entry details in here
  details: ITransaction[];
  constructor(private cashDrawerService: CashdrawerService, private router: Router) { }

  ngOnInit() {
    //if no employee found in the session
    if (window.sessionStorage.getItem('employee') == null) {
      this.router.navigate(['']);
      return;
    }
    //get employee id from session
    let employeeId = JSON.parse(window.sessionStorage.getItem('employee')).id;
    //get cash drawer entries from backend
    this.cashDrawerService.getCashDrawerEntries(employeeId).subscribe((data) => {
      this.drawers = data.modelObj;
    }, error => {
      swal('Oops!', error, 'error')
    })
  }
  //ask transaction detail child to show drawer entry detail
  openDetail(event: string) {
    let employeeId = JSON.parse(window.sessionStorage.getItem('employee')).id;
    this.cashDrawerService.getCashDrawerDetail(employeeId, event).subscribe((data) => {
      this.details = data.modelObj;
    }, error => {
      swal('Oops!', error, 'error')
    })
  }

}
