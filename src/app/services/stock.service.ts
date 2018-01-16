import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/publish";

import "rxjs/add/operator/do";
import {ToastService} from "./toast.service";

@Injectable()
export class StockService {

  private apiUrl: string = '/api/stocks';
  stocks = [];
  socket = io(window.location.host);
  loading: boolean = true;

  constructor(private httpClient: HttpClient,
              private toastService: ToastService) {
    this.getStocks();
    this.socket.on('added', stock => this.stocks = [...this.stocks, stock]);
    this.socket.on('deleted',
      stockCode => this.stocks = this.stocks.filter(stock => stock['Meta Data']['2. Symbol'] !== stockCode));
  }

  getStocks(): void {
    this.loading = true;
    this.httpClient.get(this.apiUrl).subscribe(
      (response: any[]) => this.stocks = response,
      error => {
        this.toastService.showToast('Could not fetch stocks.');
        this.loading = false;
      },
      () => this.loading = false
    );
  }

  addStock(stockCode: string): Observable<Object> {
    this.loading = true;
    return this.httpClient.post(this.apiUrl, {stockCode}).do(
      response => this.toastService.showToast('Stock added.'),
      error => {
        this.toastService.showToast('Could not add stock.');
        this.loading = false;
      },
      () => this.loading = false
    );
  }

  deleteStock(stockCode: string): Observable<Object> {
    this.loading = true;
    return this.httpClient.delete(`${this.apiUrl}/${stockCode}`).do(
      response => this.toastService.showToast('Stock deleted.'),
      error => {
        this.toastService.showToast('Could not delete stock.');
        this.loading = false;
      },
      () => this.loading = false
    );
  }

}
