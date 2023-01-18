import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeployComponent } from './deploy/deploy.component';
import { JdbcComponent } from './jdbc/jdbc.component';

const routes: Routes = [
  { path: 'jdbc', component: JdbcComponent },
  { path: 'deploy', component: DeployComponent },
  { path: '', redirectTo: 'deploy', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
