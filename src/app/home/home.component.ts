import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { IProduct, ICashDrawer, Cart, CartProduct } from '../../models/models';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CartService } from './cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //child instance of cart component to call its functions
  @ViewChild(CartComponent) child: CartComponent;
  //instance of child component product to call its function from in here
  @ViewChild(ProductComponent) child1: ProductComponent;
  customerId: number;
  cart: Cart;
  ngOnInit() {
    if (window.sessionStorage.getItem('employee') == null) {
      this.router.navigate(['']);
      return;
    }
  }
  constructor(private cartService: CartService,private router:Router) { }
  //when add to cart button is clicked create or update cart data
  productEvent(productInfo: any) {
    let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
    if (carts == null) {
      carts = [];
      this.createCart(productInfo);
      carts.push(this.cart);
    }
    else {
      let flag: number = 0;
      let employeeId: number = JSON.parse(window.sessionStorage.getItem('employee')).id;
      carts = carts.map((cart) => {
        if (cart != null && cart.customerId == this.customerId && cart.employeeId == employeeId) {
          flag = 1;
          cart = this.updateCart(productInfo, cart);
        }
        return cart;
      })

      if (flag == 0) {
        this.createCart(productInfo);
        carts.push(this.cart);
      }
    }
    window.localStorage.setItem('carts', JSON.stringify(carts));
    this.child.refreshCart();
  }
  //create cart
  createCart(product: any) {
    this.cart = this.cartService.createCart(product, this.child.customerId, 1);
  }

  //update cart
  updateCart(product, cart: Cart): Cart {
    return this.cartService.updateCart(product, cart, 1);
  }
  //create cart product item
  createCartProductItem(product: IProduct): CartProduct {
    return this.cartService.createCartProductItem(product, 1);
  }

  //get customer id from child component cart
  getCustomerIdFromChild(id: number) {
    this.customerId = id;
    // this.child1.changeStock();
  }

  update(event) {
    this.findStoredCartAndUpdate(event);
    this.child1.changeStock();
  }

  findStoredCartAndUpdate(event) {
    let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
    carts = carts.map((cart) => {
      if (cart != null && cart.customerId == this.customerId) {
        cart = this.incrementOrDecrementQuantity(event, cart);
      }
      return cart;
    })
    window.localStorage.setItem('carts', JSON.stringify(carts));
    this.child.refreshCart();
  }

  incrementOrDecrementQuantity(event, cart): Cart {
    if (event.increase == true) {
      cart = this.increaseQuantity(event.id, cart);
    }
    else {
      cart = this.decreaseQuantity(event.id, cart);
    }
    return cart;
  }

  increaseQuantity(id, cart): Cart {
    return this.cartService.increaseQuantity(id, cart);
  }
  decreaseQuantity(id, cart): Cart {
    return this.cartService.decreaseQuantity(id, cart);
  }

  askProductChildToChangeStock() {
    this.child1.changeStock();
  }
}
