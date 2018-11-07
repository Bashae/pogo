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
    console.log(this.lat);
    console.log(this.lon);
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }
}
