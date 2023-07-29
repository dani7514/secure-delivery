import { CartItem } from "./cartItem";

export class Cart{
    items:CartItem[]=[];
    totalCount:number=0;
    totalPrice:number = 0;
}