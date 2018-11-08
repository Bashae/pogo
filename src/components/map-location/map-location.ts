import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'map-location',
  templateUrl: 'map-location.html'
})
export class MapLocationComponent {
  @Input() lat;
  @Input() lon;
  map: GoogleMap

  constructor(

  ) {
    
  }

  ngOnInit() {
    if(this.lat && this.lon){
      this.loadMap();
    }
  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCMcsiZ1AJmR3T7MKnJ8HaRtrWpw36rDDE',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCMcsiZ1AJmR3T7MKnJ8HaRtrWpw36rDDE'
    });


    this.map = GoogleMaps.create('map_canvas', {
      camera: {
         target: {
           lat: this.lat,
           lng: this.lon
         },
         zoom: 18,
         tilt: 30
       }
    });
  }
}
