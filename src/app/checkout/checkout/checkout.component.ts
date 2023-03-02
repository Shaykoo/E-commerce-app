import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart = []
  cartTotal= 0
  // Form Initilization
  checkoutForm = this.fb.group({
    firstName: [ '', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    addressOne: ['', Validators.required],
    addressTwo: [''],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required]
  })

  constructor( private router: Router, private fb : FormBuilder ,private productsService : ProductsService) { }

  /* This will fetch the cart
      and it's total when this
      componet loads */
  
  ngOnInit() {
    this.productsService.getCart()
    .subscribe((data) => {
      this.cart = [...data]
      this.cartTotal = this.cart.reduce((acc,cur) => acc + Number(cur.price), 0)
    })
  }

  
  doCheckout(){
    const order = {
      ...this.checkoutForm.value,
      items: this.cart
    }
    this.productsService.checkout(order).subscribe((res) => {
      const snackbar = document.getElementById('snackbar')
      snackbar.innerHTML = 'Order placed successfully !!!'
      snackbar.className = 'show'
      setTimeout(()=>{
        snackbar.className = snackbar.className.replace('show', '')
        this.productsService.clearCart()
        this.router.navigate(['/products'])
      },3000)
      
    })
  }

}
