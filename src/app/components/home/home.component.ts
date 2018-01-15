import {Component, OnInit} from '@angular/core';
import {StockService} from "../../services/stock.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as io from 'socket.io-client';

@Component({
  selector: 'fcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  socket = io(window.location.host);

  constructor(public stockService: StockService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.socket.on('added', stock => this.form.controls['stockCode'].setValue(''));
  }

  createForm() {
    this.form = this.fb.group({
      stockCode: ''
    });
  }

  addNewStock() {
    this.stockService.addStock(this.form.controls['stockCode'].value);
  }

}
