import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Order[] = new Array<Order>;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders)=>{
      console.log('order from server',orders);
      this.orders = orders
      
    })
  }

}
