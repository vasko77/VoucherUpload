import { Component, OnInit } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { IVoucher } from '../models/voucher.model';
import {IntlModule} from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  vouchers: IVoucher[];

  constructor( private voucherService: VouchersService) { }

  ngOnInit() {
    this.voucherService.getVouchers()
    .subscribe((vouchers: IVoucher[]) => {
      this.vouchers = vouchers;
      // this.toastr.success( message, 'Success!', { dismiss: 'click' } );
      console.log(this.vouchers);
    },
    (error: any) => {
      // this.toastr.error( 'Something went wrong', 'Error', { dismiss: 'click' } );
      console.error(error);
    }
    );
  }

}
