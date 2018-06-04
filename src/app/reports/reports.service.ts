import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ITransaction } from '../../models/models';

@Injectable()
export class ReportsService {

  BASE_URL = "http://localhost:8080/employees/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': '1789912654'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //get transaction list from the server
  getReport(employeeId: number, start: string, end: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL + employeeId + '/reports?startDate=' + start + "&endDate=" + end, this.httpOptions)
      .do((data: any) => {
        if (data.length == 0) {
          swal('Oops!', "No transaction found yet", 'error');
          return;
        }
        this.downloadCSVFile(data)
      })
      .catch(this.handleError);
  }


  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  downloadCSVFile(reports: ITransaction[]) {
    var csvData = this.ConvertToCSV(reports);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'EmployeeReport.csv';
    a.click();
  }

  // convert Json to CSV data in Angular2
  ConvertToCSV(objArray: ITransaction[]) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

}
