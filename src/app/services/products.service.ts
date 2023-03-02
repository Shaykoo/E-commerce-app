import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  products = [];
  cart = [];
  productsSub;
  cartSub;

  constructor( private http: HttpClient) { 
    this.productsSub = new BehaviorSubject<any[]>(this.products)
    this.cartSub = new BehaviorSubject<any[]>(this.cart)
  } 
/* subject --> Observable --> so that components can subscribe 
  see getProducts()
  this method is fetching the array of products from the backend */
  
  fetchProducts(){
    //we need to make this array an observable as any component which fetchs this array 
    // may get updated as the array gets updated using .subscribe to know if there is 
    // any change in the array that's why using observable is awesome
    //for all of the abve we need to convert this array in SUBJECT
    //An observable allows you to subscribe only whereas a subject
    // allows you to both publish and subscribe.
    this.http.get<any[]>('/api/products').subscribe((data)=>{
      this.products = [...data]  // spread operator
      //as the products array gets updated time by time we need to tell productSub about it
      this.productsSub.next([...this.products])
    })
    
  }

  //And this is fetching from fetchProducts() to display to the front-end
  getProducts(){ // returning the products array as an observable
    return this.productsSub.asObservable();
  }

  getCart(){ // returning the products array as an observable
    return this.cartSub.asObservable();
  }

  addToCart(id){
    const product = this.findItemInProducts(id)
    if(product.length !== 0){
      if(this.findItemInCart(id).length){
        this.removeFromCart(id)
      }else{
        this.cart.push(product[0])
      }
      this.cartSub.next([...this.cart])
    }
  }

  removeFromCart(id){
    if(this.findItemInCart(id).length){
      const item = this.findItemInCart(id)[0]
      const index = this.cart.indexOf(item)
      this.cart.splice(index, 1) 
    }
    //updating the cart for the observable
    this.cartSub.next([...this.cart])
  }

  clearCart(){
    this.cartSub.next([])
  }

  findItemInCart(id){
    const item = this.cart.filter( product => product._id === id )
    return item
  }

  findItemInProducts(id){
    const item = this.products.filter(product => product._id === id ) //filter gives a new array
    return item
  }

  checkout(data){
    return this.http.post('/api/checkout', data)
  }

}
