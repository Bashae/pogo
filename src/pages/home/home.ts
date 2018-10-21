import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { GroupPage } from '../group/group';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs';

import { AddGroupPage } from '../add-group/add-group';
import { AddEventPage } from '../add-event/add-event';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  nearbyPlayers: any[];
  nearbyGroups: any[];
  nearbyEvents: any[];
  radius: number = 2;
  selection: string;
  mapLat;
  mapLon;
  autocomplete: string = "";
  locations: any[];
  location: any;
  GoogleAutocomplete;
  userFriends: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public geo: GeoProvider,
    private geolocation: Geolocation,
    public auth: AuthProvider,
    private googleMaps: GoogleMaps,
    private changeDetector: ChangeDetectorRef,
    public user: UserProvider
  ) {
    this.selection = "Looking for Pokemon";
    this.userFriends = this.user.userFriends;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.locations = [];
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  changeSelection(ev) {
    this.selection = ev;
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map_canvas')
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 35.5012683,
          lng: -80.8609436
        },
        zoom: 18
      }
    }
    
    let map = GoogleMaps.create(element, mapOptions);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    )
   
    // create LatLng object
    // let ionic: LatLng = new LatLng(43.0741904,-89.3809802);
   
    // create CameraPosition
    // let position: CameraPosition = {
    //   target: ionic,
    //   zoom: 18,
    //   tilt: 30
    // }
   
    // move the map's camera to position
    // map.moveCamera(position);
   
    // create new marker
    // let markerOptions: MarkerOptions = {
    //   position: ionic,
    //   title: 'Ionic'
    // }
   
    // const marker: Marker = map.addMarker(markerOptions)
    //   .then((marker: Marker) => {
    //      marker.showInfoWindow();
    //    });
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

  goToGroupPage(group) {
    this.navCtrl.push(GroupPage, {'group': group});
  }

  goToAddGroupPage() {
    this.navCtrl.push(AddGroupPage);
  }

  goToAddEventPage() {
    this.navCtrl.push(AddEventPage);
  }
}
