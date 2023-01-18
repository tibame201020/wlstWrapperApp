import { Routes } from '@angular/router';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
    { path: 'summary', component: SummaryComponent },
    { path: 'backtesting', component: BackTestingComponent },
    { path: '', redirectTo: 'summary', pathMatch: 'full' }
];

export const StrategyRouter = routes;
