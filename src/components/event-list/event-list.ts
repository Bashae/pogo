import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from '../../providers/geo/geo';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventListComponent {
  events: any[];
  eventListType: any = 'geo';
  coords: any;
  isLocatorActive: boolean;

  // map: GoogleMap;
  nearbyEvents: any[];
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
    public geoService: GeoProvider
  ) {
    this.events = this.user.userEvents || [];
    this.locations = [];

    if(this.geoService.getLocation()) {
      this.coords = this.geoService.getLocation();
      this.isLocatorActive = this.geoService.isLocatorActive;

      console.log('is locator active event');
      console.log(this.isLocatorActive);

      this.getEventsByGeo();
    }
  }

  setLocator() {
    if(this.geoService.isLocatorActive) {
      this.geoService.locatorOff();
    } else {
      this.geoService.locatorOn();
    }

    this.isLocatorActive = this.geoService.isLocatorActive;
  }

  getEventsByGeo() {
    this.setCoordinates();
    this.coords = this.getCoordinates();

    this.geolocation.getCurrentPosition().then(resp => {
      let events = this.geoService.getAreaEvents(resp.coords.latitude, resp.coords.longitude, 30);
      
      events.subscribe(res => {
        this.nearbyEvents = res;
      });
    });
  }

  setCoordinates() {
    this.geoService.setLocation(false);
  }

  getCoordinates() {
    return this.geoService.getLocation();
  }
}
