import { Component, Input } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { GeoProvider } from '../../providers/geo/geo';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {
  userListType: any = 'geo';
  friends: any[];
  nearbyPlayers: any[];
  coords: any;
  isLocatorActive: boolean;

  constructor(
    public user: UserProvider,
    public geo: GeoProvider
  ) {
    this.friends = this.user.userFriends || [];

    if(this.geo.getLocation()) {
      this.coords = this.geo.getLocation();
      this.isLocatorActive = this.geo.isLocatorActive;

      this.getNearbyPlayers();
    }
  }

  setLocator() {
    if(this.geo.isLocatorActive) {
      this.geo.locatorOff();
    } else {
      this.geo.locatorOn();
    }

    this.isLocatorActive = this.geo.isLocatorActive;
  }

  clickGetPlayers() {
    this.setLocator();
    this.getNearbyPlayers();
  }

  getNearbyPlayers() {
    this.setCoordinates();
    this.coords = this.getCoordinates();
    
    let players = this.geo.getNearbyPlayers(this.coords.lat, this.coords.lon);

    players.subscribe(res => {
      this.nearbyPlayers = res;
    });
  }

  setCoordinates() {
    this.geo.setLocation(false);
  }

  getCoordinates() {
    return this.geo.getLocation();
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

}
