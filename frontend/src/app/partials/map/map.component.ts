import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {LatLngTuple, Map, map, tileLayer, Marker, LatLng, marker, LatLngExpression,icon, LeafletMouseEvent, latLng} from "leaflet";
import { Order } from '../../shared/models/order';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input()
  order!:Order;
  @Input()
  readonly:boolean = false;
  private readonly MARKER_ZOOM_LEVEL= 16;
  private readonly MARKER_ICON= icon({
    iconUrl:'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconSize:[42,42],
    iconAnchor:[21,42]
  })
  private readonly DEFAULT_LATLNG:LatLngTuple=[20.5937,78.9629]
  @ViewChild('map',{static:true})
  mapRef!:ElementRef;
  map!:Map;
  currentMarker!:Marker;
  constructor() { }

  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();

    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }

  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement,
                  {attributionControl:false
                  }).setView(this.DEFAULT_LATLNG,1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click',(e:LeafletMouseEvent)=>{
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    if (navigator.geolocation) {  
      navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      const location = {
        lat:position.coords.latitude,
        lng:position.coords.longitude
      }
      this.map.setView(location,this.MARKER_ZOOM_LEVEL);
      this.setMarker(location);
      }, (error) => {
        console.error(error);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }   
  }

  setMarker(latlng:LatLngExpression){

    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker){
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng,{
      draggable:true,
      icon:this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend',()=>{
      this.addressLatLng = this.currentMarker.getLatLng(); 
      
    })
  }

  set addressLatLng(latlng:LatLng){
    if(!latlng.lat.toFixed) return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}
