import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchRouter } from './search/routing';
import { StrategyRouter } from './strategy/routing';

const routes: Routes = [
  { path: 'search', children: SearchRouter },
  { path: 'strategy', children: StrategyRouter },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
