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

  changeSelection(ev) {
    this.selection = ev;
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map_canvas')
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.mapLat,
          lng: this.mapLon
        },
        zoom: this.radius
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

  setCoordinates() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.mapLat = resp.coords.latitude;
      this.mapLon = resp.coords.longitude;
      this.loadMap();
      this.getNearbyPlayers(resp.coords.latitude, resp.coords.longitude);
      this.trackUser();
    });
  }

  // setRadius() {
  //   this.geo.changeRadius(this.radius);
  // }

  trackUser() {
    const subscription = this.geolocation.watchPosition();
    let lastUpdate, currentUpdate;
    lastUpdate = 0;
    currentUpdate = 1;

    setInterval(function() {
      currentUpdate++;
    }, 15000);

    subscription.subscribe(position => {
      this.mapLat = position.coords.latitude;
      this.mapLon = position.coords.longitude;

      if(lastUpdate !== currentUpdate) {
        lastUpdate = currentUpdate;
        this.geo.changePosition(position);
      }
    })
  }

  getNearbyPlayers(lat, lon) {
    let players = this.geo.getNearbyPlayers(lat, lon);
    players.subscribe(res => {
      this.nearbyPlayers = res;
    });
  }

  getAreaGroups(lat, lon) {
    let groups = this.geo.getAreaGroups(lat, lon, 30);
    
    groups.subscribe(res => {
      this.nearbyGroups = res;
      this.changeDetector.detectChanges();
    });
  }

  getAreaEvents(lat, lon) {
    let events;
    if(this.mapLat) {
      events = this.geo.getAreaEvents(this.mapLat, this.mapLon, 30);
    } else {
      this.setCoordinates();
      events = this.geo.getAreaEvents(this.mapLat, this.mapLon, 30);
    }
    
    events.subscribe(res => {
      this.nearbyEvents = res;
    });
  }

  selectLocation(loc) {
    this.location = loc;
    this.locations = [];
    this.getPlacesLatLong(loc.description);
  }

  getPlacesLatLong(address) {
    var geocoder = new google.maps.Geocoder();
    let _that = this;

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let lat = results[0].geometry.location.lat();
        let lon = results[0].geometry.location.lng();

        _that.getAreaGroups(lat, lon);
      }
    });
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
