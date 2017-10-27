import { Component, OnInit } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { IVoucherModel } from '../models/voucher.model';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  vouchers: IVoucherModel[];

  constructor( private voucherService: VouchersService) { }

  ngOnInit() {
    this.vouchers = this.voucherService.getVouchers();
  }

}
