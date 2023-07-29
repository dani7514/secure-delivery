import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { FoodService } from '../services/food.service';
import { Foods } from '../shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  constructor(
                private route:ActivatedRoute,
                private fs:FoodService,
                private router:Router,
                private cs:CartService,
) { }
  food: Foods = new Foods;
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      if(param['id'])
      this.fs.getFoodById(param['id']).subscribe((serverFood)=>{
        this.food=serverFood;
      })
    });
  }

  // try for new approach
  addToCart(){
    this.cs.addToCart(this.food);
    this.router.navigate(['/cart']);
  }

  addToFav(id:number){
    // this.fs.addToFav(id);
    // console.log('food',this.fs.getFoodById(id))
  }
}
