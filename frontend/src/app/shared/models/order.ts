import { LatLng } from "leaflet";
import { CartItem } from "./cartItem";

export class Order{
    id!: Number;
    items!: CartItem[];
    totalPrice!: number;
    name!: String;
    address!: String;
    addressLatLng?:LatLng
    paymentId!: String;
    createdAt!: String;
    status!: String;


}