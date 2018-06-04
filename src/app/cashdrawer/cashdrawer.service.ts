import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ICashDrawer, ITransaction } from '../../models/models';

@Injectable()
export class CashdrawerService {

  BASE_URL = "http://localhost:8080/employees/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get cash drawer entries from the server
  getCashDrawerEntries(id: number): Observable<any> {
    return this.httpClient.get<ICashDrawer[]>(this.BASE_URL + id + '/transactions', this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //get that drawer placed order detail
  getCashDrawerDetail(id: number, date: string): Observable<any> {
    return this.httpClient.get<ITransaction[]>(this.BASE_URL + id + '/transactions?date=' + date, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.error.message);
    return Observable.throw(err.error.message);
  }

}
