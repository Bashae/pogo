import { Component } from '@angular/core';
import { GeoProvider } from '../../providers/geo/geo';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'list-pokemon',
  templateUrl: 'list-pokemon.html'
})
export class ListPokemonComponent {
  searchType: string;
  mapLat: any;
  mapLon: any;

  constructor(
    public geo: GeoProvider,
    public geolocation: Geolocation
  ) {
    this.searchType = "raids";
    let raidsCall = this.getLocation();
    raidsCall.then(resp => {
      console.log('run a');
      let raids = this.geo.getNearbyRaids(resp.coords.latitude, resp.coords.longitude);
      raids.subscribe(res => {
        console.log('sub');
        console.log(res);
      });
    });
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

}
