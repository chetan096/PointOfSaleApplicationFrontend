import { Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck } from '@angular/core';
import { Cart, IEmployee, ICustomer, IProduct } from '../../../../models/models';
import { ReviewcartComponent } from '../../../reviewcart/reviewcart.component';
import { ReviewcartService } from '../../../reviewcart/reviewcart.service';
import { Router } from '@angular/router';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit,OnChanges {
  //cart itself stored in local storage
  cart: Cart;
  @Input() customerId: number;
  //refresh child
  @Input() refresh: boolean;
  //for increase quantity when clicked + button
  increase: boolean = true;
  //for decrease quantity when clicked - button
  decrease: boolean = false;
  customer: ICustomer;
  @Output() update = new EventEmitter<Object>();
  //ask parent to refresh me after updating cart
  @Output() refreshMe = new EventEmitter();
  //update product stock
  @Output() updateStock = new EventEmitter();
  products: IProduct[];
  constructor(private reviewCartService: ReviewcartService, private router: Router, private productService: ProductService) {

  }

  ngOnInit() {
   
  }
  ngOnChanges() {
    
    this.cart = null;
    //get customer of selected customer id from the server
    this.reviewCartService.getCustomer(this.customerId).subscribe((data) => {
      this.customer = data;
      let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
      let employee: IEmployee = JSON.parse(window.sessionStorage.getItem('employee'));
      if (carts != null) {
        for (let item of carts) {
          if (item != null) {
            if ((item.customerId == this.customerId) && (item.employeeId == employee.id)) {
              console.log("cart set")
              this.cart = item;
              break;
            }
          }
          
        }
        this.productService.getProducts().subscribe((data) => {
          this.products = data;
          for (let product of this.products) {
            for (let index in this.cart.cartProducts) {
              if (this.cart.cartProducts[index].productId == product.id) {
                if (product.quantity == 0) {
                  this.cart.cartProducts.splice(+index, 1);
                }
                else if (product.quantity < this.cart.cartProducts[index].quantity) {
                  this.cart.cartProducts[index].quantity = product.quantity;
                }
                let carts:Cart[]=JSON.parse(window.localStorage.getItem('carts'));
                let employeeId:number=JSON.parse(window.sessionStorage.getItem('employee')).id;
                carts=carts.map((cart)=>{
                   if(cart!=null&&cart.customerId==this.cart.customerId&&cart.employeeId==employeeId){
                     console.log("mil gyi")
                     cart=this.cart;
                   }
                   return cart;
                })
                window.localStorage.setItem('carts',JSON.stringify(carts));
                break;
              }
            }
          }
        })
      }
    })
  }
  //update quantity of the product in the cart
  updateQuantity(event: any) {
    let flag = (event.target.value == 'true')
    this.update.emit({ id: event.target.id, increase: flag });
  }

  //delete cart of customer when delete button clicked
  delete() {
    if (this.cart == null) {
      swal('Sorry!', 'There is nothing to delete', 'error');
      return;
    }
    let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
    let employee: IEmployee = JSON.parse(window.sessionStorage.getItem('employee'));
    if (carts != null) {
      for (let index in carts) {
        if (carts[index] == null) {
          carts.splice(Number(index), 1);
          continue;
        }
        if ((carts[index].customerId == this.customerId) && (carts[index].employeeId == employee.id)) {
          let myIndex = +index;
          carts.splice(myIndex, 1);
          window.localStorage.setItem('carts', JSON.stringify(carts));
          swal('Congrats!', 'deleted successfully', 'success');
          this.refreshMe.emit();
          this.updateStock.emit();
          break;
        }
      }
    }
  }

  //remove item from cart when delete icon clicked
  removeItem(event) {
    let id = +event.target.id;
    for (let index in this.cart.cartProducts) {
      let myIndex = +index;
      if (this.cart.cartProducts[index].productId == id) {
        this.cart.cartProducts.splice(myIndex, 1);
        break;
      }
    }
    let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
    let employeeId: number = JSON.parse(window.sessionStorage.getItem('employee')).id;
    carts = carts.map((cart) => {
      if (cart != null) {
        if (cart.customerId == this.customerId && cart.employeeId == employeeId) {
          cart = this.cart;
        }
        return cart;
      }
    })
    window.localStorage.setItem('carts', JSON.stringify(carts));
    this.refreshMe.emit();
    this.updateStock.emit();
  }
}
