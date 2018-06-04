import { Injectable } from '@angular/core';
import { IProduct } from '../../../models/models';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService {

  BASE_URL = "http://localhost:8080/products";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get products from the backend server
  getProducts(): Observable<any> {
    return this.httpClient.get<IProduct[]>(this.BASE_URL, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.error.message);
  }
}
