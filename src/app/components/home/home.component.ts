import {Component, OnInit} from '@angular/core';
import {StockService} from "../../services/stock.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'fcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(public stockService: StockService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      stockCode: ''
    });
  }

  addNewStock() {
    this.stockService.addStock(this.form.controls['stockCode'].value).subscribe(
      response => this.form.controls['stockCode'].setValue('')
    );
  }

}
