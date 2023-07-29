import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.css']
})
export class PaymentsPageComponent implements OnInit {
  order:Order = new Order();
  constructor(private orderService:OrderService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:(err)=>{
        this.router.navigate(['/checkout']);
      }
    })
  }

}
