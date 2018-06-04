import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './order.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  url: string;
  orderMap: any;
  orderDetail: any;
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    if (window.sessionStorage.getItem('employee') == null) {
      this.router.navigate(['']);
      return;
    }
    this.url = this.router.url;
    let employeeId: number = JSON.parse(window.sessionStorage.getItem('employee')).id;
    //get all orders
    if (this.url == '/orders') {
      this.orderService.getAllOrders(employeeId).subscribe((data) => {
        this.createMap(data.modelObj);
      })
    }
    //get saved orders
    else if (this.url == '/savedorders') {
      this.orderService.getAllOrdersWithStatus('saved', employeeId).subscribe((data) => {
        this.createMap(data.modelObj);
      })
    }

  }
  //create map from order list for grouping orders where date is the key and values are the list of orders
  createMap(list) {
    this.orderMap = new Map();
    for (let item of list) {
      if (this.orderMap.has(item.date)) {
        let orderlist = this.orderMap.get(item.date);
        orderlist.push(item);
        this.orderMap.set(item.date, orderlist);
      }
      else {
        let orderlist = [];
        orderlist.push(item);
        this.orderMap.set(item.date, orderlist);
      }

    }
    this.orderDetail = this.orderMap.values().next().value[0];
  }
  //show order details
  show(order) {
    this.orderDetail = order;
  }
}
