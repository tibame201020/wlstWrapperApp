import { Routes } from '@angular/router';
import { FinancialComponent } from './financial/financial.component';
import { PriceComponent } from './price/price.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
    { path: 'summary', component: SummaryComponent },
    { path: 'price', component: PriceComponent },
    { path: 'financial', component: FinancialComponent },
    { path: '', redirectTo: 'summary', pathMatch: 'full' }
];

export const SearchRouter = routes;
