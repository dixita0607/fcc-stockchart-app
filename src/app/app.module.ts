import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {StockService} from "./services/stock.service";
import {HttpClientModule} from "@angular/common/http";
import {StockComponent} from './components/stock/stock.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StockChartComponent} from './components/stock-chart/stock-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockComponent,
    StockChartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
