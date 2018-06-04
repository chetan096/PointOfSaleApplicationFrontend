import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reviewcart',
  templateUrl: './reviewcart.component.html',
  styleUrls: ['./reviewcart.component.css']
})
export class ReviewcartComponent implements OnInit {

  customerId: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (window.sessionStorage.getItem('employee') == null) {
      this.router.navigate(['']);
      return;
    }
    let id: number;
    this.customerId = +this.route.snapshot.paramMap.get('id')
  }

}
