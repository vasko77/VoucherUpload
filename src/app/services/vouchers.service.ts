import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IVoucher, VoucherStatus, VoucherType } from '../models/voucher.model';

@Injectable()
export class VouchersService {

  constructor(private http: Http ) { }

  getVouchers(): Observable<IVoucher[]> {

    const url = `https://nettestna.eurolife.gr/VoucherUploadApi/vouchers`;

    const headers = new Headers();

    return this.http.get( url, { withCredentials: true } )
        .map( (respones: Response) => {
          const vouchers = respones.json() as IVoucher[];
          return vouchers;
        } )
        .catch( ( error: any ) => {
          const errorMessage = error; // this.logging.logError( error );
          return Observable.throw( errorMessage );
        } );
  }

}
