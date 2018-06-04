import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ProductService } from './home/product/product.service';
import { ProductComponent } from './home/product/product.component';
import { CartComponent } from './home/cart/cart.component';
import { CartdetailsComponent } from './home/cart/cartdetails/cartdetails.component';
import { CartService } from './home/cart/cart.service';
import { CustomerlistComponent } from './home/cart/customerlist/customerlist.component';
import { ReviewcartComponent } from './reviewcart/reviewcart.component';
import { CustomercartComponent } from './reviewcart/customercart/customercart.component';
import { CheckoutComponent } from './reviewcart/checkout/checkout.component';
import { ReviewcartService } from './reviewcart/reviewcart.service';
import { OrdersComponent } from './orders/orders.component';
import { OrderdetailComponent } from './orders/orderdetail/orderdetail.component';
import { OrderlistComponent } from './orders/orderlist/orderlist.component';
import { OrderService } from './orders/order.service';
import { CashdrawerComponent } from './cashdrawer/cashdrawer.component';
import { TransactionComponent } from './cashdrawer/transaction/transaction.component';
import { TransactiondetailComponent } from './cashdrawer/transactiondetail/transactiondetail.component';
import { CashdrawerService } from './cashdrawer/cashdrawer.service';
import { ErrorPageComponent } from './error-page/error-page-component.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from './reports/reports.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    CartdetailsComponent,
    CustomerlistComponent,
    ReviewcartComponent,
    CustomercartComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderdetailComponent,
    OrderlistComponent,
    CashdrawerComponent,
    TransactionComponent,
    TransactiondetailComponent,
    ErrorPageComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'cartreview/:id', component: ReviewcartComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'savedorders', component: OrdersComponent },
      { path: 'cashdrawer', component: CashdrawerComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', component: LoginComponent },
      { path: '**', component: ErrorPageComponent }
    ])
  ],
  providers: [LoginService, ProductService, CartService, ReviewcartService, OrderService, CashdrawerService, ReportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
