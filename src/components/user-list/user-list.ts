import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker
} from '@ionic-native/google-maps';

import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { GeoProvider } from '../../providers/geo/geo';
import { NavController } from 'ionic-angular';
import { UserPage } from '../../pages/user/user';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {
  public map: GoogleMap;

  userListType: any = 'geo';
  userImage: string = "";
  friends: any[];
  nearbyPlayers: any[] = [];
  coords: any;
  isLocatorActive: boolean;
  location: any;

  constructor(
    public user: UserProvider,
    public geo: GeoProvider,
    public navCtrl: NavController
  ) {
    this.friends = this.user.userFriends || [];

    this.geo.isLocatorActive.subscribe(res => {
      this.isLocatorActive = res;
      this.location = this.geo.getLocation();
    })
  }

  ngAfterViewInit() {
    console.log('anit has been viewed');
    if(this.isLocatorActive) {
      this.location.subscribe(res => {
        if(res.lat !== null){
          this.makeMap(res.lat, res.lon);
          this.getNearbyPlayers();
        }
      })
    }
  }

  goToPlayerPage(player) {
    this.navCtrl.push(UserPage, {'user': player});
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

  setMarkerColor(team) {
    if(team === 'Mystic') {return 'blue';}
    if(team === 'Valor') {return 'red';}
    if(team === 'Instinct') {return 'yellow';}
  }

  placeMarkers(players) {
    players.forEach(player => {
      let marker: Marker = this.map.addMarkerSync({
        title: player.un,
        icon: this.setMarkerColor(player.t),
        position: {
          lat: player.pos.geopoint.latitude,
          lng: player.pos.geopoint.longitude
        }
      });
      
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   alert('clicked');
      //   some sort of ui interaction with person clicked on
      // });
    });
  }

  clickGetPlayers() {
    this.getNearbyPlayers();
  }

  getNearbyPlayers() {
    this.location.subscribe(res => {
      let players = this.geo.getNearbyPlayers(res.lat, res.lon);

      players.subscribe(res => {
        this.nearbyPlayers = res;
        this.placeMarkers(res);
      });
    });
  }

  getCoordinates() {
    return this.geo.getLocation();
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

}
