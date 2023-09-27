import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxTreeListModule } from 'devextreme-angular';
import { Service } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DxTreeListModule],
  providers: [Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
