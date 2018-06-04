import { Component, OnInit, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { CartService } from './cart.service';
import { ICustomer } from '../../../models/models';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  //height of the component is the height of the window
  height: number = window.innerHeight;
  input: string;
  customers: ICustomer[];
  showCustomers: boolean;
  showCart: boolean;
  customerId: number;
  refreshChild: boolean;
  @Output() takeCustomerId = new EventEmitter<number>();
  @Output() updateHome = new EventEmitter<Object>();
  @Output() updateStock = new EventEmitter();
  constructor(private cartService: CartService) {
    false;
  }

  ngOnInit() {
  }
  ngOnChanges() {

  }

  getCustomer() {
    if (this.input == void (0) || this.input == "") {
      alert("Please enter input first ");
      return;
    }
    this.cartService.getCustomer(this.input).subscribe((data) => {
      this.customers = data.modelObj;
      this.showCustomers = true;
      this.showCart = false;
      this.takeCustomerId.emit(undefined);
      if (this.customers.length == 0)
        swal('Sorry!', data.message, 'error');
      else
        swal('Congrats!', data.message, 'success')

    }, (error: any) => {
      swal('Oops!', error.message, 'error');
    }

    )
  }

  onKey(event: any) {
    this.input = event.target.value;
    if (this.input == "") {
      this.customers = [];
      return;
    }
    this.cartService.getCustomer(this.input).subscribe((data) => {
      this.customers = data.modelObj;
      this.showCustomers = true;
      this.showCart = false;
      this.takeCustomerId.emit(undefined);
      // swal('Congrats!', data.message, 'success');

    }, (error: any) => {
      // swal('Oops!', error, 'error');
    }
    )
  }

  showCartDetailsComponent(customerId) {
    this.showCart = true;
    this.showCustomers = false;
    this.customerId = customerId;
    this.takeCustomerId.emit(customerId);
  }
  refreshCart() {
    this.refreshChild = !this.refreshChild;
  }
  updateCart(event) {
    this.updateHome.emit(event);
  }

  cartDetailAskingToUpdateStock() {
    this.updateStock.emit();
  }
}
