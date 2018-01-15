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
    const x = ['x'];
    let columns = this.stocks.map(stock => {
      const column = [stock['Meta Data']['2. Symbol']];
      const timeSeries = stock['Time Series (Daily)'];
      Object.keys(timeSeries).forEach(key => {
        const keyObj = timeSeries[key];
        x.push(key);
        column.push(keyObj[Object.keys(keyObj)[0]]);
      });
      return column;
    });
    columns = [...columns, x];
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });
  }

}
