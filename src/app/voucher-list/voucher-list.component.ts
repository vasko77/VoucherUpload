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
  dateFrom: Date;
  dateTo: Date;

  vouchers: IVoucher[];
  selectedVoucher: IVoucher;
  decline: boolean;
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
    this.busy = this.voucherService.getVouchers( this.contractNo, this.renewalNo, this.amendmentNo, this.applicationNo, this.taxNo,
                                                 this.dateFrom, this.dateTo )
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
    this.decline = false;

    let dialog: DialogRef;

    if ( voucher.agentType === 1 ) {
      dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Αντίγρ.Πελ.', 'Εκτύπωση', template);
    } else {
      dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Πρωτοτύπου', 'Εκτύπωση', template);
    }

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.printVoucher(this.selectedVoucher, VoucherDocumentType.Original)
            .subscribe((pdfBytes: Blob) => {

              this.openWindowWithPdf( pdfBytes );
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
    this.decline = false;

    const dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Αντιγράφου', 'Εκτύπωση', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.printVoucher(this.selectedVoucher, VoucherDocumentType.Copy)
            .subscribe((pdfBytes: Blob) => {

              this.openWindowWithPdf( pdfBytes );
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
    this.decline = false;

    const dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση Ειδοποιητηρίου', 'Εκτύπωση', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.printVoucher(this.selectedVoucher, VoucherDocumentType.Notification)
            .subscribe((pdfBytes: Blob) => {

              this.openWindowWithPdf( pdfBytes );
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
    this.decline = true;

    const dialog = this.openDialog('Παρακαλώ επιβεβαιώστε την Εκτύπωση από Eurolife', 'Εκτύπωση από Eurolife', template);

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        if ((result as DialogAction).primary) {
          console.log('PRINTING');

          this.busy = this.voucherService.declineVoucher(this.selectedVoucher)
            .subscribe((value: any) => {
              this.selectedVoucher.statusOriginal = 9;
              this.toastr.success('Επιτυχής Εκτύπωση από Eurolife', 'Επιτυχία');
            },
            (error: any) => {
              this.toastr.error('Αδύνατη Εκτύπωση από Eurolife', 'Σφάλμα');
              console.error(error);
            });

        }
        console.log('action', result);
      }
    });
  }

  isOriginalDisabled( voucher: IVoucher ): boolean {
    return ( voucher.statusOriginal !== 3 && voucher.statusOriginal !== 5 );
  }

  isCopyDisabled( voucher: IVoucher ): boolean {
    return voucher.statusCopy !== 3 && voucher.statusCopy !== 5;
  }

  isNotificationDisabled( voucher: IVoucher ): boolean {
    return voucher.statusNotification !== 3 && voucher.statusNotification !== 5;
  }

  isDeclineDisabled( voucher: IVoucher ): boolean {
    return voucher.statusOriginal !== 3
        || !voucher.commercial
        || voucher.voucherType === 'P'
        || voucher.voucherType === 'C';
  }

  isBookletDisabled( voucher: IVoucher ): boolean {
    return voucher.voucherType === 'P'
        || voucher.voucherType === 'C'
        || !( voucher.packetCode === '316' || voucher.packetCode === '319'
           || voucher.packetCode === '324' || voucher.packetCode === '325'
           || voucher.packetCode === '312' || voucher.packetCode === '313' );
  }

  bookletHref( voucher: IVoucher ): string {
    if ( voucher.packetCode === '316' || voucher.packetCode === '319'
      || voucher.packetCode === '324' || voucher.packetCode === '325'
      || voucher.packetCode === '312' || voucher.packetCode === '313' ) {
        return 'assets/Booklet.PDF';
      }
      return '';
  }

  getOriginalDenialReason( voucher: IVoucher ): string {
    if ( voucher.statusOriginal < 3 ) {
      return 'Μη αναρτημένο';
    }
    if ( voucher.statusOriginal === 9 ) {
      return 'Θα εκτυπωθεί από Eurolife';
    }
    return '';
  }

  getDeclineDenialReason( voucher: IVoucher ): string {

    if ( voucher.voucherType === 'P' ) {
      return 'Πρόσθετη Πράξη';
    }
    if ( voucher.voucherType === 'C' ) {
      return 'Ακύρωση';
    }
   if ( !voucher.commercial ) {
      return 'Κατοικία';
    }
    if ( voucher.statusOriginal < 3 ) {
      return 'Μη αναρτημένο';
    }
    if ( voucher.statusOriginal === 5 ) {
      return 'Εκτυπωμένο';
    }
    if ( voucher.statusOriginal === 9 ) {
      return 'Θα εκτύπωθει από Eurolife';
    }
    return '';
  }

  getCopyDenialReason( voucher: IVoucher ): string {
    if ( voucher.statusCopy < 3 ) {
      return 'Μη αναρτημένο';
    }
    return '';
  }

  getNotificationDenialReason( voucher: IVoucher ): string {
    if ( voucher.statusNotification < 3 ) {
      return 'Μη αναρτημένο';
    }
    return '';
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
      height: this.decline ? 300 : 250,
      minWidth: 250
    });

    return dialog;
  }

  private openWindowWithPdf( pdfBytes: Blob ) {

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(pdfBytes, 'file.pdf');
    } else {
      const objectUrl = URL.createObjectURL(pdfBytes);
      window.open(objectUrl);
    }
  }

}



