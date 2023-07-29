import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.check();
  }
  check(){
    this.http.post('https://food-ordering-backend-8sd0.onrender.com/paymentStatus',{
      id:JSON.parse(localStorage.getItem("paymentResponse")||"").id
    }).subscribe((res)=>{
      localStorage.setItem("paymentIntent",JSON.stringify(res));
      
    })
  }
}
