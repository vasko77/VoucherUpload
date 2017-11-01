import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IVoucher, VoucherStatus, VoucherType } from '../models/voucher.model';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable()
export class VouchersService {

  private baseUr = 'http://localhost:37624/';

  constructor(private http: Http) { }

  getVouchers( contractNo: number, renewalNo: Number, amendmentNo: Number, applicationNo: Number, taxNo: Number ): Observable<IVoucher[]> {

    const url = this.baseUr + `vouchers?contractNo=${contractNo}&renewalNo=${renewalNo}&amendmentNo=${amendmentNo}`
                            + `&applicationNo=${applicationNo}&taxNo=${taxNo}`;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(url, options)
      .map((response: Response) => {
        const vouchers = response.json() as IVoucher[];
        return vouchers;
      })
      .map(response => (<GridDataResult>{
        data: response.map(item => {
          item.issueDate = new Date(item.issueDate);
          item.startDate = new Date(item.startDate);
          item.endDate = new Date(item.endDate);
          return item;
        }),
        total: response.length
      }))
      .catch((error: any) => {
        const errorMessage = error; // this.logging.logError( error );
        return Observable.throw(errorMessage);
      });
  }

  printVoucher(refno: number): Observable<string> {

    return Observable.of( 'http://eh017ins101/MotorContractGUI/Printouts/5378/RunIdVouchers_5378.pdf' );
  }

  getUser(): Observable<string> {
    const url = this.baseUr + 'user';

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(url, options)
      .map((response: Response) => {
        const userName = response.text();
        return userName;
      })
      .catch((error: any) => {
        const errorMessage = error; // this.logging.logError( error );
        return Observable.throw(errorMessage);
      });
  }

}
