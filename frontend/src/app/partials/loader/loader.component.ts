import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading!:boolean
  constructor(private loaderService:LoaderService) {
    loaderService.isLoading.subscribe((isLoading)=>{
      this.isLoading = isLoading;
    });
   }

  ngOnInit(): void {

  }

}
