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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  public map: GoogleMap;
  event: any;
  isLocatorActive: any;
  location: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geo: GeoProvider
  ) {
    this.event = this.navParams.get('event');
    console.log(this.event);

    this.geo.isLocatorActive.subscribe(res => {
      this.isLocatorActive = res;
      this.location = this.geo.getLocation();
    })
  }

  ngAfterViewInit() {
    if(this.isLocatorActive) {
      this.location.subscribe(res => {
        if(res.lat === null){
          return false;
        }
        this.makeMap(res.lat, res.lon);
      })
    }
  }

  makeMap(lat, lon) {
    let mapOptions: GoogleMapOptions = {
      camera: {
          target: {
            lat: lat,
            lng: lon
          },
          zoom: 14
        }
    };

    this.map = GoogleMaps.create('map', mapOptions);
  }
  
}