import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
var pendingRequests = 0;
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    pendingRequests+=1;
    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handleHide();
          }
        },
        error:(_)=>this.handleHide()
      })
    );
  }

  handleHide(){
    pendingRequests-=1;
    if(pendingRequests===0){
      this.loaderService.hideLoader();
    }
  }
}
