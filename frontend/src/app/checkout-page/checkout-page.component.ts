import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(
    cartService:CartService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastr:ToastrService,
    private orderService:OrderService,
    private router:Router
    ) {
      const cart = cartService.getCart();
      this.order.items= cart.items;
      this.order.totalPrice= cart.totalPrice;
     }

  ngOnInit(): void {
    let {firstName,lastName, houseNumber, streetArea, city, state, pincode}= this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[`${firstName} ${lastName}`, Validators.required],
      address:[`${houseNumber}, ${streetArea}, ${city}, ${state}, ${pincode}`, Validators.required]
    })
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastr.warning('Please fill the inputs', 'Invalid inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastr.warning('Please select your location on the map','Location')
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;
    
    this.orderService.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payments');
      },
      error:(err)=>{
        this.toastr.error('Cart');
      }
    })
  }

}
