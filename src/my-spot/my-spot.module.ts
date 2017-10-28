import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MySpotHeaderComponent } from './my-spot-header/my-spot-header.component';
import { MySpotBodyComponent } from './my-spot-body/my-spot-body.component';
import { MySpotFooterComponent } from './my-spot-footer/my-spot-footer.component';
import { MySpotContentComponent } from './my-spot-content/my-spot-content.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MySpotHeaderComponent,
    MySpotBodyComponent,
    MySpotFooterComponent,
    MySpotContentComponent
  ],
  exports: [
    MySpotHeaderComponent,
    MySpotBodyComponent,
    MySpotFooterComponent,
    MySpotContentComponent
  ]
})
export class MySpotModule { }
