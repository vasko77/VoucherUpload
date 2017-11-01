import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import '@progress/kendo-angular-intl/locales/el/all';

import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { MySpotModule } from '../my-spot/my-spot.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VouchersService } from './services/vouchers.service';
import { ToastCustomOptions } from './config/ToastCustomOptions';
import { ToastOptions } from 'ng2-toastr/src/toast-options';


@NgModule({
  declarations: [
    AppComponent,
    VoucherListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ToastModule.forRoot(),
    GridModule,
    DialogModule,
    AppRoutingModule,
    MySpotModule
  ],
  providers: [
    HttpModule,
    VouchersService,
    {provide: ToastOptions, useClass: ToastCustomOptions},
    {
      provide: LOCALE_ID, useValue: 'el-GR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
