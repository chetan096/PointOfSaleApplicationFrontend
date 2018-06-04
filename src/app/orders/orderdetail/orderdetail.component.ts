import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../home/cart/cart.service';
import { Cart, Order } from '../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  @Input() order: any;
  height: number = window.innerHeight;
  url: string;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.url = this.router.url;
  }
  //delete order from orders and reload it into cart stored in the local storage
  reload() {
    if (this.order == void (0)) {
      swal('Oops!', 'Nothing to reload', 'error');
      return;
    }
    if (confirm('Are you sure you want to reload?')) {
      let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
      let cart: Cart;
      if (carts == null) {
        carts = [];
      }
      let employeeId = JSON.parse(window.sessionStorage.getItem('employee')).id
      cart = this.findCart(carts, employeeId);
      if (cart == null) {
        cart = new Cart();
        cart.cartProducts = [];
        cart.customerId = this.order.customer.id;
        cart.total = 10;
        cart.subtotal = 0;
        cart.tax = 10;
        cart.employeeId = employeeId;
        for (let orderDetail of this.order.orderdetails) {
          cart = this.cartService.updateCart(orderDetail.product, cart, orderDetail.quantity);
        }
        carts.push(cart);
      }
      else {
        for (let orderDetail of this.order.orderdetails) {
          cart = this.cartService.updateCart(orderDetail.product, cart, orderDetail.quantity);
        }
        carts = carts.map((myCart) => {
          if (cart!=null&&cart.customerId == this.order.customer.id && cart.employeeId == employeeId) {
            myCart = cart;
          }
          return myCart;
        })
      }
     
      window.localStorage.setItem('carts', JSON.stringify(carts));
      this.cartService.deleteSaved(this.order.id).subscribe((data) => {
        swal('Congrats!', 'Successfully added ' + this.order.customer.username + ' saved order into cart\nSelect customer to get cart', 'success');
        this.router.navigate(['home']);
      }, error => {
        swal('Oops!', error, 'error')
      })
    }
  }
  findCart(carts: Cart[], employeeId: number): Cart {
    let myCart = null;
    if (carts.length != 0) {
      for (let cart of carts) {
        if (cart!=null && cart.customerId == this.order.customer.id && cart.employeeId == employeeId) {
          myCart = cart;
          break;
        }
      }
    }
    return myCart;
  }
}
