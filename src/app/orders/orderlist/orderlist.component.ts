import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnChanges {


  @Input() orders: any;
  height: number = window.innerHeight;
  url: string;
  @Output() showDetails = new EventEmitter();
  constructor(private router: Router) { }

  ngOnChanges() {
    this.url = this.router.url;
  }

  //get values or order list of the map
  getValues() {
    if (this.orders != void (0))
      return Array.from(this.orders.values());
  }

  //show order details of order selected
  showOrderDetails(id: number, date: string) {
    let orderList = this.orders.get(date);
    for (let order of orderList) {
      if (order.id == id) {
        this.showDetails.emit(order);
        break;
      }
    }
  }
}
