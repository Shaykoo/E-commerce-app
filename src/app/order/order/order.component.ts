import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders = []
  constructor( private http: HttpClient) { }

  
  /* This will fetch all the orders
     when this components loads */
  ngOnInit() {
    this.http.get<any>('/api/orders').subscribe((data)=>{
      this.orders = [...data]
    })
  }

  // Sum of order earnings
  totalEarnings(orders){
    return orders.reduce((acc, cur) => acc + this.orderTotal(cur.items), 0)
  }

  // Calculating Number of Items
  totalItems(orders){
    return orders.reduce((acc, cur) => acc + cur.items.length , 0)
  }

  // Calculating total earnings
  orderTotal(items){
    return items.reduce((acc, cur) => acc + cur.price, 0)
  }

}
