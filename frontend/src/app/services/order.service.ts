import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  create(order:Order){
    alert(order.name);
    
    return this.http.post<Order>('http://localhost:3000/orders/create',order);
  }
  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>('http://localhost:3000/orders/newOrderFromCurrentUser');
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>('http://localhost:3000/pay',order);
  }

  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:3000/orders');
  }

}
