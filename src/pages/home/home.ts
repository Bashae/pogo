import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selection: any = {};
  nearbyPlayers: any[];

  constructor(
    public navCtrl: NavController,
    public geo: GeoProvider,
    private geolocation: Geolocation,
    public auth: AuthProvider
  ) {
    this.selection.title = "Find Nearby Players";
  }

  setCoordinates() {
    // this.geolocation.getCurrentPosition().then(resp => {
    //   console.log(resp);
    //   this.getNearbyPlayers(resp.coords.latitude, resp.coords.longitude);
    //   }).catch((error) => {console.log('Error getting location', error);});
    // })

    this.geolocation.getCurrentPosition().then(resp => {
      console.log(resp);
      this.getNearbyPlayers(resp.coords.latitude, resp.coords.longitude);
    })
    .catch( res => {
      console.log(res);
    })
  }

  getNearbyPlayers(lat, lon) {
    let players = this.geo.getNearbyPlayers(lat, lon, 30);
    players.subscribe(res => {
      this.nearbyPlayers = res;
    });
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

  checkSessionStatus() {
    if(this.auth.user) {
      this.logOut();
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  logOut() {
    this.auth.logOut();
  }
}
