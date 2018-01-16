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
import {ToastComponent} from './components/toast/toast.component';
import {ToastService} from "./services/toast.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockComponent,
    StockChartComponent,
    ToastComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StockService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
