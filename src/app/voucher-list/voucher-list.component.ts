import { Component, OnInit, TemplateRef } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { IVoucher } from '../models/voucher.model';
// import { IntlModule } from '@progress/kendo-angular-intl';
// import { formatDate } from '@telerik/kendo-intl';

import { DialogService, DialogRef, DialogCloseResult, DialogAction } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  vouchers: IVoucher[];
  selectedVoucher: IVoucher;

  constructor(private dialogService: DialogService,
    private voucherService: VouchersService) { }

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

  printOriginal(voucher: IVoucher) {
    console.log(voucher);
  }

  printCopy(voucher: IVoucher, template: TemplateRef<string>) {
    console.log(voucher);

    this.selectedVoucher = voucher;

    const dialog: DialogRef = this.dialogService.open({
      title: 'Παρακαλώ επιβεβαιώστε',
      content: template,
      actions: [
        { text: 'Άκυρο' },
        { text: 'Εκτύπωση', primary: true }
      ],
      width: 450,
      height: 250,
      minWidth: 250
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log( 'PRINTING' );
        }
        console.log('action', result);
      }
    });

  }
}
