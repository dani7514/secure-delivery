import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Foods } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private route:ActivatedRoute,
     private http:HttpClient) { }
  Food!:Foods;
  getAllTag(){
    return [
      {name:'All',count:14},
      {name:'FastFood',count:4},
      {name:'Pizza',count:2},
      {name:'Lunch',count:3},
      {name:'SlowFood',count:2},
      {name:'Hamburger',count:1},
      {name:'Fry',count:1},
      {name:'Soup',count:1}

    ]
  }

  getAll():Observable<Foods[]> {
    return this.http.get<Foods[]>("http://localhost:3000/foods");
  }

  getFoodById(id:number):Observable<Foods> {
    return this.http.get<Foods>("http://localhost:3000/foods/"+id);
  }

  getFoodBySearch(searchTerm:string):Observable<Foods[]> {
    return this.http.get<Foods[]>("http://localhost:3000/foods/search/"+searchTerm);
  }

  createFood(food:Foods):Observable<Foods> {
    return this.http.post<Foods>("http://localhost:3000/foods/create",food);
  }

  // addToFav(id:number){
  //   this.getFoodById(id).favorite=!this.getFoodById(id).favorite;
  // }
}
