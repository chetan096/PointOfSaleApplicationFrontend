import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders } from '@angular/common/http';
import { Order } from '../../models/models';

@Injectable()
export class OrderService {

  BASE_URL = "http://localhost:8080/employees/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get all orders from the server
  getAllOrders(employeeId: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.BASE_URL + employeeId + '/orders', this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //get order with same passed status
  getAllOrdersWithStatus(status: string, employeeId) {
    return this.httpClient.get<Order[]>(this.BASE_URL + employeeId + '/orders?status=' + status, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //for handling error
  private handleError(err: HttpErrorResponse) {
    console.log(err.error.message);
    return Observable.throw(err.error.message);
  }

}
