import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = []

  constructor( private productsService: ProductsService) { }

  /* This will fetch all the products
     for the product screen */
  ngOnInit() {
    this.productsService.fetchProducts();
    this.productsService.getProducts()
    .subscribe((data) => {
      this.products = [...data]
    })
  }

  /* Adding Items to the cart */
  addItemToCart(item){
    this.productsService.addToCart(item._id)
  }

  itemInCart(item){
    return this.productsService.findItemInCart(item._id)
  }

}
