import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ITransaction } from '../../../models/models';

@Component({
  selector: 'app-transactiondetail',
  templateUrl: './transactiondetail.component.html',
  styleUrls: ['./transactiondetail.component.css']
})
export class TransactiondetailComponent implements OnInit, OnChanges {

  @Input() transactionDetails: ITransaction[]
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
  }

}
