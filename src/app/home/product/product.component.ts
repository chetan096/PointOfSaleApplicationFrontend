import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { IProduct, Cart } from '../../../models/models';
import { ProductService } from '../product/product.service';
import { CartdetailsComponent } from '../cart/cartdetails/cartdetails.component';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
  products: IProduct[];
  height: number = window.innerHeight;
  filteredProducts: IProduct[];
  inputValue: string;
  toggle: boolean = false;
  @Input() customerId: number;
  //ask parent to add product into the cart
  @Output() productEmit = new EventEmitter<IProduct>();

  constructor(private productService: ProductService, private router: Router, private loginService: LoginService) {
    this.products = [];
    this.filteredProducts = [];
  }
  ngOnChanges() {
    this.changeStock();
  }
  //change product stock after every updation to cart
  changeStock() {
    if (this.customerId == undefined) {
      this.filteredProducts = this.products;
    }
    else {
      this.createClone();
      let carts: Cart[] = JSON.parse(window.localStorage.getItem('carts'));
      let employeeId: number = JSON.parse(window.sessionStorage.getItem('employee')).id;
      if (carts != null) {
        carts = carts.map((cart) => {
          if(cart!=null){
          if ((cart.customerId == this.customerId) && (cart.employeeId == employeeId)) {
            for (let prod of cart.cartProducts) {
              this.filteredProducts = this.filteredProducts.map((product) => {
                if (product.id == prod.productId) {
                  product.quantity -= prod.quantity;
                  if(product.quantity<0){
                     product.quantity=0;
                  }
                }
                return product;
              })
            }
          }
          return cart;
        }
        })
      }
    }
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.createClone();
    })
  }

  //add to cart the product selected
  addToCart(event: any) {
    console.log("button clicked")
    if (this.customerId == void (0) || this.customerId == null) {
      swal('Oops', 'No customer selected yet', 'error');
      return;
    }
    let product: IProduct = this.filteredProducts[event.target.id];
    this.productEmit.emit(product);
    this.filteredProducts[event.target.id].quantity--;
  }

  //filter products
  onKey(event: any) {
    this.inputValue = event.target.value;
    if (this.inputValue == "" || this.inputValue === void (0)) {
      this.filteredProducts = this.products;

    }
    else {
      this.filteredProducts = this.filteredProducts.filter((product: IProduct) => {
        return ((product.productCode.toLocaleLowerCase().indexOf(this.inputValue.toLocaleLowerCase()) > -1) ||
          (product.productName.toLocaleLowerCase().indexOf(this.inputValue.toLocaleLowerCase()) > -1) ||
          (product.description.toLocaleLowerCase().indexOf(this.inputValue.toLocaleLowerCase()) > -1))
      })
    }
  }

  //create clone so if stock change dont chnge the original product array only update the filtered products
  createClone() {
    this.filteredProducts = [];
    this.products.map((product) => {
      //to create clone of product
      let productCpy = Object.assign({}, product);
      this.filteredProducts.push(productCpy);
    })
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  logout() {
    let employeeId = JSON.parse(window.sessionStorage.getItem('employee')).id;
    if (confirm('Are You sure to logout ?')) {
      this.loginService.getCashDrawer(employeeId).subscribe((data) => {
        if (confirm('Your starting balance was ' + data.startBalance + '\nYour ending balance is ' + data.currentBalance)) {
          swal('Congrats!', "Successfully logged out", 'success');
          window.sessionStorage.removeItem('employee');
          this.router.navigate(['']);
        }
      })
    }

  }
}
