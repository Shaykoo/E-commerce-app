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

  ngOnInit() {
    this.http.get<any>('/api/orders').subscribe((data)=>{
      this.orders = [...data]
    })
  }

  orderTotal(items){
    return items.reduce((acc, cur) => acc + cur.price, 0)
  }

  totalEarnings(orders){
    return orders.reduce((acc, cur) => acc + this.orderTotal(cur.items), 0)
  }

  totalItems(orders){
    return orders.reduce((acc, cur) => acc + cur.items.length , 0)
  }
}
