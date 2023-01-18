import { NgModule } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';

@NgModule({
  declarations: [SummaryComponent, BackTestingComponent],
  imports: [ShareshareComponetsModule],
})
export class StrategyModule {}
