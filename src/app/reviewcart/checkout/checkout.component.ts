import { Component, OnInit, Input } from '@angular/core';
import { Order, Cart, OrderDetail } from '../../../models/models';
import { ReviewcartComponent } from '../reviewcart.component';
import { ReviewcartService } from '../reviewcart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() customerId: number;
  cashClicked: boolean = false;
  cardClicked: boolean = false;
  constructor(private reviewcartService: ReviewcartService, private router: Router) { }

  ngOnInit() {
  }
  cashSelected() {
    this.cashClicked = !this.cashClicked;
  }
  cardSelected() {
    this.cardClicked = !this.cardClicked;
  }
  //set order for saving it to the database
  setOrder(status: string) {
    if (confirm('Are you sure to set the order?')) {
      if (this.cardClicked == false && this.cashClicked == false) {
        swal('Oops', 'Please select payment method first', 'error')
        return;
      }
      if (this.cardClicked && this.cashClicked) {
        swal('Oops', 'Please select one payment method only', 'error')
        return;
      }
      let modeId: number = (this.cashClicked == true) ? 1 : 2;
      let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
      let employeeId: number = JSON.parse(window.sessionStorage.getItem('employee')).id;
      let myCart: Cart;
      let cartIndex: number;
      for (let index in carts) {
        if(carts[index]==null){
           carts.splice(Number(index),1);
           continue;
        }
        if (carts[index].customerId == this.customerId && carts[index].employeeId == employeeId) {
          myCart = carts[index];
          cartIndex = +index;
          break;
        }
      }
      let amount: number = myCart.total;
      let orderdetails: OrderDetail[] = [];

      for (let product of myCart.cartProducts) {
        let detail: OrderDetail = new OrderDetail();
        detail.productId = product.productId;
        detail.quantity = product.quantity;
        detail.price = product.price;
        orderdetails.push(detail);

      }
      let order: Order = new Order(modeId, amount, amount, status, orderdetails);
      this.reviewcartService.saveOrPlaceOrder(order, this.customerId, employeeId).subscribe((data) => {
        swal('US$' + myCart.total, 'Order has created successfully\n Order Id:#' + data.modelObj.id, 'success');
        carts.splice(cartIndex, 1);
        window.localStorage.setItem('carts', JSON.stringify(carts));
        this.router.navigate(['/home']);
      }, (error: any) => {
        swal('Oops', error, 'error')
      })
    }
  }

}
