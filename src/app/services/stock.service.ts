import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';

@Injectable()
export class StockService {

  apiUrl: string = '/api/stocks';
  stocks = [];
  socket = io(window.location.host);
  loading: boolean = true;

  constructor(private httpClient: HttpClient) {
    this.getStocks();
    this.socket.on('added', stock => this.stocks = [...this.stocks, stock]);
    this.socket.on('deleted',
      stockCode => this.stocks = this.stocks.filter(stock => stock['Meta Data']['2. Symbol'] !== stockCode));
  }

  getStocks(): void {
    this.loading = true;
    this.httpClient.get(this.apiUrl).subscribe(
      (response: any[]) => this.stocks = response,
      error => console.log(error),
      () => this.loading = false
    );
  }

  addStock(stockCode: string): void {
    this.loading = true;
    this.httpClient.post(this.apiUrl, {stockCode}).subscribe(
      response => {
      },
      error => console.log(error),
      () => this.loading = false
    );
  }

  deleteStock(stockCode: string): void {
    this.loading = true;
    this.httpClient.delete(`${this.apiUrl}/${stockCode}`).subscribe(
      response => {
      },
      error => console.log(error),
      () => this.loading = false
    );
  }

}
