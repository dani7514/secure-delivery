import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { GuardGuard } from './auth/guard.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { FailedComponent } from './failed/failed.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { TesComponent } from './tes/tes.component';
import { VerifyComponent } from './verify/verify.component';
import { CreateFoodComponent } from './create-food/create-food.component';

const routes: Routes = [
  {path: "create", component: CreateFoodComponent, canActivate:[GuardGuard]},
  {path:'home', component:HomeComponent, canActivate:[GuardGuard]},
  {path:'verification', component:VerifyComponent},
  {path:'search/:searchItem',component:HomeComponent, canActivate:[GuardGuard]},
  {path:'tag/:tag',component:HomeComponent, },
  {path:'tes',component:TesComponent},
  {path:'food/:id',component:FoodPageComponent, canActivate:[GuardGuard]},
  {path:'cart',component:CartComponent, canActivate:[GuardGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[GuardGuard]},
  {path:'checkout',component:CheckoutPageComponent, canActivate:[GuardGuard]},
  {path:'payments',component:PaymentsPageComponent, canActivate:[GuardGuard]},
  {path:'payment-success',component:SuccessComponent},
  {path:'payment-failed',component:FailedComponent},
  {path:'orders',component:OrdersComponent, canActivate:[GuardGuard]},
  {path:'', redirectTo:'login', pathMatch:'full'},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }