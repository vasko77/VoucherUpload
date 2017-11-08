import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { IVoucher, VoucherDocumentType } from '../models/voucher.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DialogService, DialogRef, DialogCloseResult, DialogAction } from '@progress/kendo-angular-dialog';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  busy: Subscription;

  contractNo: number;
  renewalNo: Number;
  amendmentNo: Number;
  applicationNo: Number;
  taxNo: Number;

  vouchers: IVoucher[];
  selectedVoucher: IVoucher;
  pdfUrl: string;
  pdfBytes: Uint8Array;

  constructor(private dialogService: DialogService,
    private voucherService: VouchersService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getVouchers();
  }

  getVouchers() {
    this.busy = this.voucherService.getVouchers(this.contractNo, this.renewalNo, this.amendmentNo, this.applicationNo, this.taxNo)
      .subscribe((vouchers: IVoucher[]) => {
        this.vouchers = vouchers;
        console.log(this.vouchers);
      },
      (error: any) => {
        this.toastr.error('Πρόβλημα ανάκτησης δεδομένων', 'Σφάλμα');
        console.error(error);
      });
  }

  printOriginal(voucher: IVoucher, template: TemplateRef<string>) {

    console.log(voucher);

    this.selectedVoucher = voucher;

    const dialog: DialogRef = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Πρωτοτύπου', 'Εκτύπωση', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.printVoucher(this.selectedVoucher, VoucherDocumentType.Original)
            .subscribe((pdfBytes: Blob) => {

              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(pdfBytes);
              } else {
                const objectUrl = URL.createObjectURL(pdfBytes);
                window.open(objectUrl);
              }

            },
            (error: any) => {
              this.toastr.error('Αδύνατη εκτύπωση Πρωτότυπου', 'Σφάλμα');
              console.error(error);
            });

        }
        console.log('action', result);
      }
    });
  }

  printCopy(voucher: IVoucher, template: TemplateRef<string>) {
    console.log(voucher);

    this.selectedVoucher = voucher;

    const dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Αντιγράφου', 'Εκτύπωση', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.printVoucher(this.selectedVoucher, VoucherDocumentType.Copy)
            .subscribe((pdfBytes: Blob) => {

              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(pdfBytes);
              } else {
                const objectUrl = URL.createObjectURL(pdfBytes);
                window.open(objectUrl);
              }

            },
            (error: any) => {
              this.toastr.error('Αδύνατη εκτύπωση Αντιγράφου', 'Σφάλμα');
              console.error(error);
            });

        }
        console.log('action', result);
      }
    });

  }

  printNotification(voucher: IVoucher, template: TemplateRef<string>) {
    console.log(voucher);

    this.selectedVoucher = voucher;

    const dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Ειδοποιητηρίου', 'Εκτύπωση', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.printVoucher(this.selectedVoucher, VoucherDocumentType.Notification)
            .subscribe((pdfBytes: Blob) => {

              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(pdfBytes);
              } else {
                const objectUrl = URL.createObjectURL(pdfBytes);
                window.open(objectUrl);
              }

            },
            (error: any) => {
              this.toastr.error('Αδύνατη εκτύπωση Ειδοποιητηρίου', 'Σφάλμα');
              console.error(error);
            });

        }
        console.log('action', result);
      }
    });

  }

  declineOriginal(voucher: IVoucher, template: TemplateRef<string>) {
    console.log(voucher);
    this.selectedVoucher = voucher;

    const dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Αποποίηση Πρωτοτύπου', 'Αποποίηση', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.declineVoucher(this.selectedVoucher)
            .subscribe((value: any) => {
              this.toastr.success('Επιτυχής Αποποίηση', 'Επιτυχία');
            },
            (error: any) => {
              this.toastr.error('Αδύνατη Αποποίηση', 'Σφάλμα');
              console.error(error);
            });

        }
        console.log('action', result);
      }
    });
  }

  printTest() {
    this.voucherService.printVoucherTest()
      .subscribe((pdfBytes: Blob) => {
        const fileURL = URL.createObjectURL(pdfBytes);
        window.open(fileURL);
      },
      (error: any) => {
        this.toastr.error('**************', 'Σφάλμα');
        console.error(error);
      });
  }

  private openDialog(title: string, buttonText: string, template: TemplateRef<string>): DialogRef {

    const dialog: DialogRef = this.dialogService.open({
      title: title,
      content: template,
      actions: [
        { text: 'Άκυρο' },
        { text: buttonText, primary: true }
      ],
      width: 550,
      height: 250,
      minWidth: 250
    });

    return dialog;
  }
}



