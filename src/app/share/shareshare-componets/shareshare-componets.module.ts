import { NgModule } from '@angular/core';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { ShareModule } from '../share/share.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [DatePickerRangeComponent, LoadingComponent],
  imports: [ShareModule],
  exports: [ShareModule, DatePickerRangeComponent, LoadingComponent],
})
export class ShareshareComponetsModule {}
