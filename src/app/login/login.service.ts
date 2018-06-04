import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from '../../models/models';
import { ICashDrawer } from '../../models/models';

@Injectable()
export class LoginService {

  BASE_URL = "http://localhost:8080/employees";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get employee matching passed username and password 
  getEmployee(username: string, password: string): Observable<any> {
    console.log(username + "" + password)
    return this.httpClient.post<IEmployee>(this.BASE_URL + '/login', { username: username, password: password }, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //get cash drawer of employee with passed employee id
  getCashDrawer(id: number): Observable<any> {
    return this.httpClient.get<IEmployee>(this.BASE_URL + '/' + id + '/cashdrawer', this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //add start balance to the cash drawer after first login of the page
  addStartBalance(startBalance: number, id: number): Observable<any> {
    return this.httpClient.post<ICashDrawer>(this.BASE_URL + '/' + id + '/cashdrawer', { startBalance: startBalance }, this.httpOptions)
      .do(data => console.log('All ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.error.message);
  }

}
