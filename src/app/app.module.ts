import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule }  from '@angular/common/http';
import {ProductListService } from './product-list.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
