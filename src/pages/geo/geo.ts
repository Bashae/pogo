import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { GroupPage } from '../group/group';
import { AddGroupPage } from '../add-group/add-group';
import { AddEventPage } from '../add-event/add-event';

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

@IonicPage()
@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html',
})
export class GeoPage {
  map: GoogleMap;
  nearbyPlayers: any[];
  nearbyGroups: any[];
  nearbyEvents: any[];
  radius: number = 2;
  selection: any = {"title": ""};
  mapLat;
  mapLon;
  autocomplete: string = "";
  locations: any[];
  location: any;
  GoogleAutocomplete;
  trackUserBool: boolean = false;
  subscription;
  lastIdiot: string = "";
  wasteEater: string = "";

  constructor(
    public navCtrl: NavController,
    public geo: GeoProvider,
    private geolocation: Geolocation,
    public auth: AuthProvider,
    private googleMaps: GoogleMaps,
    private changeDetector: ChangeDetectorRef
  ) {
    this.selection.title = "Looking for Pokemon";
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.locations = [];
    this.lastIdiot = "Alpha";
    this.wasteEater = "Beta";
  }

  onSelectionChanged(type) {
    this.selection.title = type;
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
      (res) => {
        this.lastIdiot = "Then";
        this.wasteEater = res;
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    ).catch((err) => {
      this.lastIdiot = "Catch";
      this.wasteEater = err;
    })
   
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

  getGroupsByGeo() {
    console.log('get groups by geo: a');

    this.geolocation.getCurrentPosition().then(resp => {
      console.log('get groups by geo: b');
      this.mapLat = resp.coords.latitude;
      this.mapLon = resp.coords.longitude;
      this.getAreaGroups(this.mapLat, this.mapLon);
    });
  }

  getEventsByGeo() {
    console.log('get events by geo: a');

    this.geolocation.getCurrentPosition().then(resp => {
      console.log('get events by geo: b');
      this.mapLat = resp.coords.latitude;
      this.mapLon = resp.coords.longitude;
      this.getAreaEvents(this.mapLat, this.mapLon);
    });
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
      events = this.geo.getAreaEvents(this.mapLat, this.mapLon, 30);
    }
    
    events.subscribe(res => {
      this.nearbyEvents = res;
    });
  }

  getAutocompleteResults() {
    if (this.autocomplete == '') {
      this.locations = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete}, res => {
      if(res !== null) {
        this.locations = res;
        this.changeDetector.detectChanges();
      }
    });

    // this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete },
    // (predictions, status) => {
    //   console.log('a');
    //   console.log(predictions);
    //   console.log('b');
    //   console.log(status);
    //   this.autocompleteItems = [];
    //   this.zone.run(() => {
    //     predictions.forEach((prediction) => {
    //       console.log('what is prediction');
    //       console.log(prediction);
    //       this.autocompleteItems.push(prediction);
    //     });
    //   });
    // });
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
        _that.getAreaEvents(lat, lon);
      }
    });
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

  goToGroupPage(group) {
    this.navCtrl.push(GroupPage, {'group': group});
  }

  checkSessionStatus() {
    if(this.auth.user) {
      this.logOut();
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  goToAddGroupPage() {
    this.navCtrl.push(AddGroupPage);
  }

  goToAddEventPage() {
    this.navCtrl.push(AddEventPage);
  }

  logOut() {
    this.auth.logOut();
  }
}
