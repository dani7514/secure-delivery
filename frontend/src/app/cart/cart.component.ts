import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';
import { FoodService } from '../services/food.service';
import { NavigationService } from '../services/navigation.service';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart!:Cart;
  sum:number=0;
  cartSubscription!:Subscription;
  constructor(private cs:CartService, private navigation:NavigationService ) {
       this.cartSubscription= this.cs.getCartObservable().subscribe((cart)=>{
        this.cart=cart;
      })
     }
  ngOnInit(): void {
    
  }

  removeFromCart(index:number){
    this.cs.removeFromCart(index)
  }

  changeQty(cartItem:CartItem,quantityInString:string){
    const quantity=parseInt(quantityInString);
    this.cs.changeQuantity(cartItem.food.id,quantity);
  }

  ngOnDestroy(): void {
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe()
    }
  }

}
