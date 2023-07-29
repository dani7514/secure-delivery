import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Foods } from '../shared/models/food';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fs:FoodService,
              private route:ActivatedRoute,
              private naviagtionService:NavigationService) { }
  food:any[]=[];
  ngOnInit(): void {

    this.naviagtionService.reloadOnce();

    let foodObservable:Observable<Foods[]>;
    this.route.params.subscribe(params=>{
      if(params['searchItem']){
        foodObservable=this.fs.getFoodBySearch(params['searchItem']);
      }
      else if(params['tag']){
         this.fs.getAll().subscribe((f)=>{
          this.food=params['tag']=="All"?f:f.filter(food=>food.tags.includes(params['tag']))
        })
      }
      else{    
        foodObservable = this.fs.getAll();
      }
      foodObservable.subscribe((serverFoods)=>{
        this.food=serverFoods;
      })
    })
  }



  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
