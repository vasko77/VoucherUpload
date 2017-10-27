import { Injectable } from '@angular/core';
import { IVoucherModel, VoucherStatus, VoucherType } from '../models/voucher.model';

@Injectable()
export class VouchersService {

  constructor() { }

  getVouchers(): IVoucherModel[] {
    return [
      {
        id: 1,
        refNo: 888111,
        contractNo: 2100001,
        renewalNo: 0,
        amendmentNo: 0,
        status: VoucherStatus.uploaded,
        statusOriginal: VoucherStatus.uploaded,
        statusCopy: VoucherStatus.uploaded,
        statusNotification: VoucherStatus.notUploaded,
        isPaid: false,
        isRemoved: false,
        voucherType: VoucherType.Contract
      },
      {
        id: 2,
        refNo: 888222,
        contractNo: 2100002,
        renewalNo: 0,
        amendmentNo: 0,
        status: VoucherStatus.cannotUpload,
        statusOriginal: VoucherStatus.cannotUpload,
        statusCopy: VoucherStatus.cannotUpload,
        statusNotification: VoucherStatus.notUploaded,
        isPaid: false,
        isRemoved: false,
        voucherType: VoucherType.Contract
      }
    ];
  }

}
