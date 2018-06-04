import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  start: string;
  end: string;
  startDate: Date;
  endDate: Date;
  constructor(private reportService: ReportsService) { }

  ngOnInit() {

  }

  //generate report
  generate() {
    if (this.start == "" || this.start == void (0) || this.end == "" || this.end == void (0)) {
      swal("Oops!", "Please select start and end date first", 'error')
      return;
    }
    this.startDate = this.convertToMyDate(this.start);
    this.endDate = this.convertToMyDate(this.end);
    if (!(this.validateDate(this.startDate, this.endDate))) {
      swal('Oops!', "Given dates are not valid", "error");
      return;
    }
    this.start = this.start.split("-").reverse().join("-");
    let input: string[] | number = this.end.split("-");
    input = (Number(input[2]) + 1);
    this.end = this.end.substring(0, 8) + input + "";
    this.end = this.end.split("-").reverse().join("-");
    let employeeId = JSON.parse(window.sessionStorage.getItem('employee')).id;
    this.reportService.getReport(employeeId, this.start, this.end).subscribe((data: any) => {
      this.start = "";
      this.end = "";
    }, error => {
    })
  }

  increaseDayBy1() {

  }

  //convert enter input string to date
  convertToMyDate(enteredDate: String): Date {
    let input: string[] | string = enteredDate.split('-');
    let year = Number(input[0]);
    let month = Number(input[1]) - 1;
    let date = Number(input[2]);
    let myDate = new Date(year, month, date);
    return myDate;
  }
  //validate both input dates i.e start should not be greater than the end and both the date should be smaller than today
  validateDate(startDate: Date, endDate: Date) {
    let today: Date = new Date();
    if (startDate.getTime() > endDate.getTime()) {
      return false;
    }
    else if (today.getTime() < startDate.getTime()) {
      return false;
    }
    else if (today.getTime() < endDate.getTime()) {
      return false;
    }
    else {
      return true;
    }
  }


}
