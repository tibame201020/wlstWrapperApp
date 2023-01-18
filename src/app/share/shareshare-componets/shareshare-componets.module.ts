import { NgModule } from '@angular/core';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    DatePickerRangeComponent
  ],
  imports: [
    ShareModule
  ],
  exports:[
    ShareModule,
    DatePickerRangeComponent
  ]
})
export class ShareshareComponetsModule { }
