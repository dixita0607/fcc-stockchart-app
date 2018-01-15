import {Component, Input} from '@angular/core';
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'fcc-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

  @Input()
  stock;

  constructor(private stockService: StockService) {
  }

  deleteStock(stockCode) {
    this.stockService.deleteStock(stockCode);
  }

}
