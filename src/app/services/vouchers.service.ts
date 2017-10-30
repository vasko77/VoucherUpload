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

  constructor(private http: Http) { }

  getVouchers(): Observable<IVoucher[]> {

    const url = `https://nettestna.eurolife.gr/VoucherUploadApi/vouchers`;

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
        total: parseInt(response['@odata.count'], 10)
      }))
      .catch((error: any) => {
        const errorMessage = error; // this.logging.logError( error );
        return Observable.throw(errorMessage);
      });
  }

}
