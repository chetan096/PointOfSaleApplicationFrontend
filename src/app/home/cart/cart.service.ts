import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ICustomer, Cart, CartProduct, IProduct, Order } from '../../../models/models';

@Injectable()
export class CartService {
  BASE_URL = "http://localhost:8080/customers";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get customers matching find by string
  getCustomer(findBy: string): Observable<any> {
    return this.httpClient.get<ICustomer[]>(this.BASE_URL + '/search/' + findBy, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.error.message);
    return Observable.throw(err.error.message);
  }

  //create cart to be store in the local storage
  createCart(product: IProduct, customerId: number, quantity: number): Cart {
    let cart = new Cart();
    cart.cartProducts = [];
    let item: CartProduct = this.createCartProductItem(product, quantity);
    cart.cartProducts.push(item);
    cart.customerId = customerId;
    cart.employeeId = JSON.parse(window.sessionStorage.getItem('employee')).id;
    cart.subtotal = 0;
    cart.total = 0;
    cart.tax = 10;
    for (let cartProduct of cart.cartProducts) {
      cart.subtotal += cartProduct.amount;
    }
    cart.total = cart.subtotal + cart.tax;
    return cart;
  }
  //create instance of product item to be stored in cart
  createCartProductItem(product: IProduct, quantity: number): CartProduct {
    let item: CartProduct = new CartProduct(product.id, product.productName, product.price, quantity * product.price, quantity);
    return item;
  }
  //update cart if already exist in the local storage
  updateCart(product, cart: Cart, quantity): Cart {
    for (let prod of cart.cartProducts) {
      if (prod.productId == product.id) {
        prod.quantity += quantity;
        prod.amount += prod.price * quantity;
        cart.subtotal += product.price * quantity;
        cart.total += product.price * quantity;
        return cart;
      }
    }
    cart.cartProducts.push(this.createCartProductItem(product, quantity));
    cart.subtotal += product.price * quantity;
    cart.total += product.price * quantity;
    return cart;
  }

  //increase product quantity by 1
  increaseQuantity(id, cart): Cart {
    for (let prod of cart.cartProducts) {
      if (prod.productId == id) {
        prod.quantity++;
        prod.amount += prod.price;
        cart.subtotal += prod.price;
        cart.total += prod.price;
        return cart;
      }
    }
  }

  //decrease product quantity by 1
  decreaseQuantity(id, cart): Cart {
    for (let index in cart.cartProducts) {
      if (cart.cartProducts[index].productId == id) {
        if (cart.cartProducts[index].quantity == 1) {
          cart.subtotal -= cart.cartProducts[index].price;
          cart.total -= cart.cartProducts[index].price;
          cart.cartProducts.splice(index, 1);
        }
        else {
          cart.cartProducts[index].quantity--;
          cart.cartProducts[index].amount -= cart.cartProducts[index].price;
          cart.subtotal -= cart.cartProducts[index].price;
          cart.total -= cart.cartProducts[index].price;
        }
        return cart;
      }
    }
  }

  //delete saved order from order table and store it in cart
  deleteSaved(orderId: number): Observable<any> {
    return this.httpClient.delete<Order>('http://localhost:8080/orders/' + orderId, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }


}
