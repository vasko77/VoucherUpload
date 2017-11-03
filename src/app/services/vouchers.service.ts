import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IVoucher, VoucherStatus, VoucherType, VoucherDocumentType } from '../models/voucher.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { environment } from '../../environments/environment';

@Injectable()
export class VouchersService {

  private baseUr = environment.vouchersBaseUrl;

  constructor(private http: Http) { }

  getVouchers(contractNo: number, renewalNo: Number, amendmentNo: Number, applicationNo: Number, taxNo: Number): Observable<IVoucher[]> {

    const url = this.baseUr + `vouchers?contractNo=${contractNo}&renewalNo=${renewalNo}&amendmentNo=${amendmentNo}`
      + `&applicationNo=${applicationNo}&taxNo=${taxNo}`;

    console.log(`service url: ${url}`);

    return this.http.get(url, { withCredentials: true })
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

  printVoucher(voucher: IVoucher, documentType: VoucherDocumentType): Observable<Uint8Array> {

    let url = environment.vouchersBaseUrl + `vouchers/${voucher.id}/print`;

    switch (documentType) {
      case VoucherDocumentType.Original: url += 'original'; break;
      case VoucherDocumentType.Copy: url += 'copy'; break;
      case VoucherDocumentType.Notification: url += 'notification'; break;
    }

    console.log(`Print Voucher Update URL: ${url}`);

    return this.http.post(url, undefined, { withCredentials: true })
      .map((response: Response) => response.arrayBuffer())
      .map((arrayBuffer: ArrayBuffer) => new Uint8Array(arrayBuffer))
      .catch((error: any) => {
        const errorMessage = error; // this.logging.logError( error );
        return Observable.throw(errorMessage);
      });

  }

  getUser(): Observable<string> {
    const url = this.baseUr + 'user';

    return this.http.get(url, { withCredentials: true })
      .map((response: Response) => {
        const userName = response.text();
        return userName;
      })
      .catch((error: any) => {
        const errorMessage = error; // this.logging.logError( error );
        return Observable.throw(errorMessage);
      });
  }

  printVoucherTest(): Observable<Blob> {

    const url = environment.vouchersBaseUrl + `vouchers/${77}/printcopy`;

    return this.http.post(url, undefined, { withCredentials: true, responseType: ResponseContentType.ArrayBuffer } )
      .map((res: Response) => {
        console.log( res );
        return new Blob([res.blob()], { type: 'application/pdf' });
      })
      .catch((error: any) => {
        const errorMessage = error; // this.logging.logError( error );
        return Observable.throw(errorMessage);
      });

  }
}
