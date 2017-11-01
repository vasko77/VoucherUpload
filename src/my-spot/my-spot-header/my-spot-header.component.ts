import { Component, OnInit } from '@angular/core';
import { VouchersService } from '../../app/services/vouchers.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-spot-header',
  templateUrl: './my-spot-header.component.html',
  styleUrls: ['./my-spot-header.component.scss']
})
export class MySpotHeaderComponent implements OnInit {

  userName: string;

  constructor(private voucherService: VouchersService) { }

  ngOnInit() {
    this.voucherService.getUser()
      .subscribe((userName: string) => {
        this.userName = userName;
      },
      (error: any) => {
        // this.toastr.error( 'Something went wrong', 'Error', { dismiss: 'click' } );
        console.error(error);
      }
      );

  }

}
