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

import { Component, group } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from '../../providers/geo/geo';
import { NavController } from 'ionic-angular';
import { EventPage } from '../../pages/event/event';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventListComponent {
  public map: GoogleMap;

  events: any[];
  eventListType: any = 'geo';
  coords: any;
  isLocatorActive: boolean;
  location: any;
  latitude: any;
  longitude: any;

  // map: GoogleMap;
  nearbyEvents: any[] = [];
  // selection: any = {"title": ""};
  // autocomplete: string = "";
  locations: any[];
  // location: any;
  // GoogleAutocomplete;
  // trackUserBool: boolean = false;
  // subscription;
  // lastIdiot: string = "";
  // wasteEater: string = "";

  constructor(
    public user: UserProvider,
    public geolocation: Geolocation,
    public geoService: GeoProvider,
    public navCtrl: NavController
  ) {
    this.events = this.user.userEvents || [];
    this.locations = [];

    this.geoService.isLocatorActive.subscribe(res => {
      this.isLocatorActive = res;
      this.location = this.geoService.getLocation();
    })
  }

  ngAfterViewInit() {
    if(this.isLocatorActive) {
      this.location.subscribe(res => {
        this.makeMap(res.lat, res.lon);
        this.getEventsByGeo();
      })
    }
  }

  goToEventPage(event) {
    this.navCtrl.push(EventPage, {'event': event});
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

  placeMarkers(events) {
    events.forEach(event => {
      let lat = event.pos.geopoint.latitude;
      let lon = event.pos.geopoint.longitude;

      let marker: Marker = this.map.addMarkerSync({
        title: event.n + ' <br>Hosted by: Group name here?',
        icon: 'blue',
        position: {
          lat: lat,
          lng: lon
        }
      });
      
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   alert('clicked');
      // });
    });
  }

  getEventsByGeo() {
    this.location.subscribe(res => {
      let events = this.geoService.getAreaEvents(res.lat, res.lon, 30);
      events.subscribe(res => {
        this.nearbyEvents = res;
        console.log(res);
        this.placeMarkers(res);
      });
    })
  }

  getCoordinates() {
    return this.geoService.getLocation();
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }
}
