import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router) { }
  searchItem:string='';
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchItem']){
        this.searchItem=params['searchItem'];
      }
    })
  }

  search(){
    if(this.searchItem){
      this.router.navigateByUrl('/search/'+this.searchItem);
    }
  }

}
