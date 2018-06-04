import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ICustomer, Cart } from '../../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit, OnChanges {

  @Input() customers: ICustomer[];
  @Output() showCartDetails = new EventEmitter<Object>();
  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  ngOnChanges() {
  }
  //ask parent to show cart details when customer selected
  openCart(id: number) {
    let cart: Cart[];
    this.showCartDetails.emit(id);
  }

}
