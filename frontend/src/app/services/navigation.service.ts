import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history:string[] = [];
  constructor(private router:Router, private location:Location) {
    router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.history.push(event.urlAfterRedirects)
      }
    })
   }

   back(): void {
    this.history.pop();
    
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  reloadOnce(){
    let reloadCount = localStorage.getItem('reloadCount')
    if(reloadCount==='1'){
      localStorage.setItem('reloadCount','0');
      window.location.reload();
    }
  }

}
