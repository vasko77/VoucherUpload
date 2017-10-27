import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VouchersService } from './services/vouchers.service';


@NgModule({
  declarations: [
    AppComponent,
    VoucherListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    AppRoutingModule
  ],
  providers: [VouchersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
