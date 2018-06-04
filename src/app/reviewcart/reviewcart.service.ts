import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ICustomer, Order } from '../../models/models';

@Injectable()
export class ReviewcartService {

  
  BASE_URL = "http://localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get customer with same passed id 
  getCustomer(findBy:number): Observable<any> {
    return this.httpClient.get<ICustomer>(this.BASE_URL +'/customers/' + findBy, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //save or place order in the server
  saveOrPlaceOrder(order:Order,customerId:number,employeeId:number):Observable<any>{
    return this.httpClient.post<Order>(this.BASE_URL +'/employees/' +employeeId+'/customers/'+customerId+'/orders',order, this.httpOptions)
    .do(data => console.log('All ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  //handle error if any
  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.error.message);
  }

 
}
