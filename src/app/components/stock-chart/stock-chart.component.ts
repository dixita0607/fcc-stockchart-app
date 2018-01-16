import {Component, Input, OnChanges} from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'fcc-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnChanges {

  @Input()
  stocks;

  chart;

  constructor() {
  }

  ngOnChanges() {
    const x = [];
    const columns = this.stocks.map(stock => {
      const column = [];
      Object.entries(stock['Time Series (Daily)']).forEach(([day, ohlcv]) => {
        x.unshift(day);
        column.unshift(ohlcv['1. open']);
      });
      column.unshift([stock['Meta Data']['2. Symbol']]);
      return column;
    });
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        columns
      },
      axis: {
        x: {
          tick: {
            culling: {
              max: 5
            },
            format: index => x[index]
          },
          label: {
            text: 'Stocks',
            position: 'outer-center'
          }
        },
        y: {
          label: {
            text: 'Instinct value',
            position: 'outer-top'
          }
        }
      }
    });
  }

}
