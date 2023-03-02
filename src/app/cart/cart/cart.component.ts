import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = []
  cartTotal = 0
  constructor(private productService : ProductsService) { }

  /* This will fetch all the products
     from the cart and total of all
     as well  */
  ngOnInit() {
    this.productService.getCart()
    .subscribe((data) => {
      this.cart = [...data]
      this.cartTotal = this.cart.reduce((acc,cur) => acc + Number(cur.price), 0)
    })
  }

  // To remove an item with an ID
  removeItemFromCart(item){
    this.productService.removeFromCart(item.id)
  }

}
