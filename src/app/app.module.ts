import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { MySpotModule } from '../my-spot/my-spot.module';
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
    HttpModule,
    FormsModule,
    GridModule,
    DialogModule,
    AppRoutingModule,
    MySpotModule
  ],
  providers: [HttpModule, VouchersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
