import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICashDrawer } from '../../../models/models';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  //height of the screen
  height: number = window.innerHeight;
  //cash drawer entries
  @Input() cashdrawers: ICashDrawer[];
  //show details of clicked entry
  @Output() openDetails = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    console.log(this.cashdrawers);
  }

  openDetail(date: string) {
    //ask parent to show details
    this.openDetails.emit(date);
  }

}
