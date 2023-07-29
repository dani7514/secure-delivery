import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { HomeComponent } from './home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './partials/search/search.component';   
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './partials/tags/tags.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { TesComponent } from './tes/tes.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MapComponent } from './partials/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaypalComponent } from './partials/paypal/paypal.component';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';
import { OrdersComponent } from './orders/orders.component';
import { LoaderComponent } from './partials/loader/loader.component';
import { LoaderInterceptor } from './partials/loader/loader.interceptor';
import { VerifyComponent } from './verify/verify.component';
import { CreateFoodComponent } from './create-food/create-food.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    TesComponent,
    CartComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CheckoutPageComponent,
    MapComponent,
    PaymentsPageComponent,
    PaypalComponent,
    SuccessComponent,
    FailedComponent,
    OrdersComponent,
    LoaderComponent,
    VerifyComponent,
    CreateFoodComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RatingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
