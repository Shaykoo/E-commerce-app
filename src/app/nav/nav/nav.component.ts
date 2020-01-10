import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  cart = []
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getCart()
    .subscribe((data) => {
      this.cart = [...data]
    })
  }

}
