import {Component} from '@angular/core';
import {StockService} from "./services/stock.service";

@Component({
  selector: 'fcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'FCC Stock Chart App';

  constructor(public stockService: StockService) {

  }

}
