import { Component, OnInit, Input } from '@angular/core';
import { Cart, IEmployee, ICustomer } from '../../../models/models';
import { ReviewcartComponent } from '../reviewcart.component';
import { ReviewcartService } from '../reviewcart.service';

@Component({
  selector: 'app-customercart',
  templateUrl: './customercart.component.html',
  styleUrls: ['./customercart.component.css']
})
export class CustomercartComponent implements OnInit {

  @Input() customerId: number;
  cart: Cart;
  customer: ICustomer;
  height: number = window.innerHeight;
  constructor(private reviewCartService: ReviewcartService) { }

  //get cart from the local storage and show its detail
  ngOnInit() {
    this.reviewCartService.getCustomer(this.customerId).subscribe((data) => {
      this.customer = data;
      let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
      let employee: IEmployee = JSON.parse(window.sessionStorage.getItem('employee'));
      if (carts != null) {
        for (let item of carts) {
          if (item!=null&&(item.customerId == this.customerId) && (item.employeeId == employee.id)) {
            this.cart = item;
            break;
          }
        }
      }
    })

  }

}
