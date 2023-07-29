import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';
import { Foods } from '../shared/models/food';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cart: Cart = this.getLocalStorage();
  foodList: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  sum: number = 0;
  // new try for better approach
  addToCart(food: Foods) {
    let cartItem = this.cart.items.find((item) => item.food.id == food.id);
    if (cartItem) {
      this.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
    } else {
      this.cart.items.push(new CartItem(food));
    }
    this.setLocalStorage();
  }
  // new try for better approach
  removeFromCart(index: number) {
    this.cart.items.splice(index, 1);
    this.setLocalStorage();
  }

  changeQuantity(foodId: number, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id == foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    this.setLocalStorage();
  }
  clearCart() {
    this.cart = new Cart();
    this.setLocalStorage();
  }
  getCartObservable(): Observable<Cart> {
    return this.foodList.asObservable();
  }

  getCart(): Cart {
    return this.foodList.value;
  }
  private setLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,0);
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,0);
    const cartJson = JSON.stringify(this.cart);
    if (localStorage.getItem('user')) {
      console.log('cart',cartJson);    
      localStorage.setItem('Cart', cartJson);
      this.storeCart();
    } else {
      localStorage.setItem('Cart', cartJson);
    }
    this.foodList.next(this.cart);
  }

  private getLocalStorage(): Cart {
    if (localStorage.getItem('user')) {
      let userCart = JSON.parse(localStorage.getItem('user')||'').cart;
      userCart = userCart?userCart:new Cart();
      // const cartJson = localStorage.getItem(this.encryptText());
      const cartJson = localStorage.getItem('Cart');
      return cartJson ? JSON.parse(cartJson) : userCart;
    } else {
      const cartJson = localStorage.getItem('Cart');
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
  }

  storeCart() {
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (localStorage.getItem('user')) {
      const userId = user.id;
      this.http.post<User>(`http://localhost:3000/user/${userId}`, this.cart)
        .subscribe((response) => {
          console.log('updated cart', response);
        });
    }
  }
}
