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
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from '../../providers/geo/geo';
import { NavController } from 'ionic-angular';
import { GroupPage } from '../../pages/group/group';

@Component({
  selector: 'group-list',
  templateUrl: 'group-list.html'
})
export class GroupListComponent {
  public map: GoogleMap;

  groups: any[];
  groupListType: any = 'geo';
  coords: any;
  isLocatorActive: boolean;
  location: any;

  // map: GoogleMap;
  // nearbyPlayers: any[];
  nearbyGroups: any[] = [];
  // nearbyEvents: any[];
  // radius: number = 2;
  // selection: any = {"title": ""};
  // mapLat;
  // mapLon;
  autocomplete: string = "";
  locations: any[];
  // location: any;
  // GoogleAutocomplete;
  // trackUserBool: boolean = false;
  // subscription;
  // lastIdiot: string = "";
  // wasteEater: string = "";

  constructor(
    public user: UserProvider,
    public geo: Geolocation,
    public geoService: GeoProvider,
    public navCtrl: NavController
  ) {
    this.groups = this.user.userGroups || [];
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
        this.getGroupsByGeo();
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

  placeMarkers(groups) {
    groups.forEach(group => {
      let lat = group.pos.geopoint.latitude;
      let lon = group.pos.geopoint.longitude;

      let marker: Marker = this.map.addMarkerSync({
        title: group.n + ' Pokemon Group',
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

  goToGroupPage(group) {
    this.navCtrl.push(GroupPage, {'group': group});
  }

  getGroupsByGeo() {
    this.location.subscribe(res => {
      let groups = this.geoService.getAreaGroups(res.lat, res.lon, 30);
      groups.subscribe(res => {
        this.nearbyGroups = res;
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
