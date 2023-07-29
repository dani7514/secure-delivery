import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Tag } from '../../shared/models/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Input()
  foodPageTags?: string[];
  tags:Tag[]=[];
  constructor(private fs:FoodService) { }

  ngOnInit(): void {
    if(!this.foodPageTags)
    {
      // this.tags=this.fs.getAllTag()
      this.fs.getAll().subscribe(f=>{
        let stags:any[]=[]
        f.map(food=>{
          stags=stags.concat(...food.tags)
        })
        let b:any={}
        stags.forEach((e)=>{
            if(!b.hasOwnProperty(e)){
                b[e]=1
            }
            else{
                b[e]+=1
            }        
          })
        stags =  Object.entries(b);
        this.tags =  stags.map((f)=>{
          return {name:f[0],count:f[1]}
      })
      this.tags.unshift({name:'All',count:this.tags.length})
      })
    }
  }

}
