import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from './share/share/share.module';
import { ShareshareComponetsModule } from './share/shareshare-componets/shareshare-componets.module';
import { DeployComponent } from './deploy/deploy.component';
import { JdbcComponent } from './jdbc/jdbc.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DeployComponent, JdbcComponent],
  imports: [
    BrowserModule,
    ShareModule,
    AppRoutingModule,
    ShareshareComponetsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
