import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';
//window.paypal
declare var paypal:any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @Input()
  order!:Order;

  constructor(
    private orderService:OrderService,
    private cartService:CartService,
    private router:Router,
    private toastr:ToastrService,
    private http:HttpClient){}
  ngOnInit(){
    
  }
  
  onPayment(){
    console.log("order",this.order);
    const response = this.http.post('https://food-ordering-backend-8sd0.onrender.com/payment',{
      items:this.order.items
    }).subscribe( async (res:any)=>{
      let stripe = await loadStripe('pk_test_51MMW2PSARWQdi33XL14tieK8XV0tW3rJOzYYeMjnzaYPufid6ZVSyIFp9SpOwBoEKpvYmjC7Yje0eJ47NosCpMKs00SfFSLWWd')
      localStorage.setItem("paymentResponse",JSON.stringify(res));
      console.log("paymentResponse",stripe);
      
      stripe?.redirectToCheckout({
        sessionId:res.id
      })
    })
    // localStorage.removeItem(this.cartService.encryptText());
    this.cartService.clearCart();
    this.cartService.storeCart();
  }

  }

