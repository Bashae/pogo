import { Component, ChangeDetectorRef } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from '../../providers/geo/geo';

@Component({
  selector: 'group-list',
  templateUrl: 'group-list.html'
})
export class GroupListComponent {
  groups: any[];
  groupListType: any = 'geo';
  coords: any;
  isLocatorActive: boolean;

  // map: GoogleMap;
  // nearbyPlayers: any[];
  nearbyGroups: any[];
  // nearbyEvents: any[];
  // radius: number = 2;
  // selection: any = {"title": ""};
  // mapLat;
  // mapLon;
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
    public geo: Geolocation,
    public geoService: GeoProvider,
    private changeDetector: ChangeDetectorRef
  ) {
    this.groups = this.user.userGroups || [];
    this.locations = [];

    if(this.geoService.getLocation()) {
      this.coords = this.geoService.getLocation();
      this.isLocatorActive = this.geoService.isLocatorActive;

      console.log('is locator active group');
      console.log(this.isLocatorActive);

      this.getGroupsByGeo();
    }
  }

  ngOnDestroy() {
    this.changeDetector.detach();
  }

  setLocator() {
    if(this.geoService.isLocatorActive) {
      this.geoService.locatorOff();
    } else {
      this.geoService.locatorOn();
    }

    this.isLocatorActive = this.geoService.isLocatorActive;
  }

  getGroupsByGeo() {
    this.setCoordinates();
    this.coords = this.getCoordinates();
    
    this.geo.getCurrentPosition().then(resp => {
      let groups = this.geoService.getAreaGroups(resp.coords.latitude, resp.coords.longitude, 30);
      groups.subscribe(res => {
        this.nearbyGroups = res;
        this.changeDetector.detectChanges();
      });
    });
  }

  setCoordinates() {
    this.geoService.setLocation(false);
  }

  getCoordinates() {
    return this.geoService.getLocation();
  }

  getCeilDistance(num) {
    return Math.ceil(num);
  }

}
